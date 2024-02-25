import { supabase } from "../supabase/client";

export async function updateDirections(
  stepNumber: string,
  recipeId: string,
  directionText: string
) {
  const { error } = await supabase
    .from("recipe_directions")
    .update({
      direction_text: directionText,
    })
    .eq("step_number", stepNumber)
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error changing username & bio:", error.message);
    return false;
  } else {
    return true;
  }
}
