import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileByUsername } from "../../../supabase/profileFunctions";
import { getRecipeByUserIdAndRecipeTitle } from "../../../supabase/recipe.functions";

export default function RecipeScreen() {
  const { usernameParam, recipeParam } = useParams();

  const [userId, setUserId] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (usernameParam) {
      getProfileByUsername(usernameParam).then((data) => {
        setUserId(data && data[0]?.profile_id);
        setUsername(data && data[0]?.username);
        setAvatarUrl(data && data[0]?.avatar_url);
      });
    }
  }, [usernameParam]);

  useEffect(() => {
    if (userId && recipeParam) {
      getRecipeByUserIdAndRecipeTitle(userId, recipeParam).then((data) => {
        setTitle(data && data[0]?.title);
        setDescription(data && data[0]?.description);
        setImageUrl(data && data[0]?.image_url);
      });
    }
  }, [userId, recipeParam]);

  return (
    <>
      <h1>Recipe</h1>
      <h2>{title}</h2>
      <h3>
        By {username}
        <br />
        <img src={avatarUrl} alt="avatar" height="50px" width="50px" />
      </h3>
      <img src={imageUrl} alt="recipe" width="120px" height="auto" />
      <p>{description}</p>
    </>
  );
}
