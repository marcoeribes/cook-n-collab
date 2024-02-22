import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export async function getAllRecipesByUserId(userId: string) {
  const { data, error } = await supabase
    .from("recipe")
    .select()
    .eq("author_id", userId);
  if (error) {
    console.error("Error getting recipe:", error.message);
  } else {
    console.log("recipe in functions:", data);
    return data;
  }
}

export async function getRecipeByUserIdAndRecipeTitle(
  userId: string,
  recipeTitle: string
) {
  const { data, error } = await supabase
    .from("recipe")
    .select()
    .eq("author_id", userId)
    .eq("title", recipeTitle);
  if (error) {
    console.error("Error getting recipe:", error.message);
  } else {
    console.log("recipe in functions:", data);
    return data;
  }
}

export async function addRecipe(
  user: User,
  title: string,
  description?: string,
  imageUrl?: string
) {
  const { data, error } = await supabase.from("recipe").insert([
    {
      author_id: user?.id,
      title: title,
      description: description,
      image_url: imageUrl,
      created_at: new Date(),
    },
  ]);
  if (error) {
    console.error("Error inserting recipe:", error.message);
    return false;
  } else {
    return true;
  }
}

export async function deleteRecipe(user: User, recipeId: string) {
  const { error } = await supabase
    .from("recipe")
    .delete()
    .eq("author_id", user?.id)
    .eq("recipe_id", recipeId);
  if (error) {
    console.error("Error deleting recipe:", error.message);
    return false;
  } else {
    return true;
  }
}

export async function updateRecipe(
  user: User,
  recipeId: string,
  newTitle?: string,
  newDescription?: string
) {
  const { error } = await supabase
    .from("recipe")
    .update({
      title: newTitle,
      description: newDescription,
    })
    .eq("author_id", user?.id)
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error changing username & bio:", error.message);
    return false;
  } else {
    console.log("username updated:", newTitle);
    console.log("bio updated:", newDescription);
    return true;
  }
}

export async function getDirectionsByRecipeId(recipeId: string) {
  const { data, error } = await supabase
    .from("recipe_directions")
    .select()
    .eq("recipe_id", recipeId);
  if (error) {
    console.error("Error getting directions:", error.message);
  } else {
    console.log("directions in functions:", data);
    return data;
  }
}
