import { supabase } from "../supabase/client";

export async function updateDirections(
  recipeId: string,
  stepNumber: number,
  directionText: string
) {
  const { error } = await supabase
    .from("recipe_directions")
    .update({
      direction_text: directionText,
      step_number: stepNumber,
    })
    .eq("step_number", stepNumber)
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error changing username & bio:", error.message);
    return false;
  } else {
    console.log("Updated direction!", stepNumber, directionText);
    return true;
  }
}

export async function addDirections(
  recipeId: string,
  stepNumber: number,
  directionText: string
) {
  const { error } = await supabase.from("recipe_directions").insert([
    {
      recipe_id: recipeId,
      step_number: stepNumber,
      direction_text: directionText,
    },
  ]);

  if (error) {
    console.error("Error adding directions:", error.message, error.details);
    return false;
  } else {
    return true;
  }
}

export async function deleteDirections(recipeId: string, directionId: number) {
  const { error } = await supabase
    .from("recipe_directions")
    .delete()
    .eq("recipe_id", recipeId)
    .eq("direction_id", directionId);

  if (error) {
    console.error("Error deleting directions:", error.message, error.details);
    return false;
  } else {
    console.log("Successfully deleted direction!", directionId);
    return true;
  }
}
