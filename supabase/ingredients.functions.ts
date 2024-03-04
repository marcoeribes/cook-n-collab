import { supabase } from "../supabase/client";

export async function updateIngredients(
  ingredientId: number,
  recipeId: number,
  ingredientText: string
) {
  const { error } = await supabase
    .from("recipe_ingredient")
    .update({
      ingredient_text: ingredientText,
    })
    .eq("ingredient_id", ingredientId)
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error updating direction", error.message, error.details);
    return false;
  } else {
    return true;
  }
}

export async function addIngredient(recipeId: number, ingredientText: string) {
  const { error } = await supabase.from("recipe_ingredient").insert([
    {
      recipe_id: recipeId,
      ingredient_text: ingredientText,
    },
  ]);

  if (error) {
    console.error("Error adding directions:", error.message, error.details);
    return false;
  } else {
    return true;
  }
}
