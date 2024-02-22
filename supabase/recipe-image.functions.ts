import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";
import { v4 as uuidv4 } from "uuid";

export async function fetchRecipeImage(user: User, recipeId: string) {
  const { data, error } = await supabase.storage
    .from("recipes")
    .list(`${user?.id}/${recipeId}/`, { limit: 1 });
  if (error) {
    console.error("Error fetching recipe image:", error);
  } else {
    console.log("recipeData", data);
    return data;
  }
}

export async function fetchRecipeImageUrl(user: User, recipeId: string) {
  const { data } = await supabase.storage
    .from("recipes")
    .getPublicUrl(`${user?.id}/${recipeId}/`);
  if (data) {
    console.log("Recipe URL:", data.publicUrl);
    return data.publicUrl;
  }
}

export async function fetchDefaultRecipeImageUrl() {
  const { data } = await supabase.storage
    .from("recipes")
    .getPublicUrl("default-recipe.jpg");
  if (data) {
    console.log("Default Recipe URL:", data.publicUrl);
    return data.publicUrl;
  }
}

export async function uploadRecipeImage(
  user: User,
  recipeId: string,
  event: React.ChangeEvent<HTMLInputElement>
) {
  if (!event.target.files || event.target.files.length === 0) {
    return;
  }

  const file = event.target.files[0];
  const imageName = `${uuidv4().substring(0, 8)}.jpg`;
  const filePath = `${user?.id}/${recipeId}/${imageName}`;

  const { data, error } = await supabase.storage
    .from("recipes")
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("Error uploading image: ", error);
  } else {
    console.log("Image uploaded successfully", data);
    return { data, imageName };
  }
}

export async function deleteRecipeImage(
  user: User,
  recipeId: string,
  recipeImage: string
) {
  const { data, error } = await supabase.storage
    .from("recipes")
    .remove([`${user?.id}/${recipeId}/${recipeImage}`]);
  if (error) {
    console.error("Error deleting image: ", error);
  } else {
    console.log("Image deleted successfully", data);
    return data;
  }
}
