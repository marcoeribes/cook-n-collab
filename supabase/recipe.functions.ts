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
