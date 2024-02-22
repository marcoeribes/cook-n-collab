import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";

import { getProfileByUsername } from "../../../supabase/profileFunctions";
import {
  deleteRecipe,
  getDirectionsByRecipeId,
  getRecipeByUserIdAndRecipeTitle,
} from "../../../supabase/recipe.functions";
import SessionProps from "../../interfaces/auth.interface";

export default function RecipeScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();
  const { usernameParam, recipeParam } = useParams();

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [userId, setUserId] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [recipeId, setRecipeId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [directions, setDirections] = useState<[]>([]);

  const navigateToEditRecipe = () => {
    navigate(`/${username}/${recipeParam}/edit`);
  };

  const navigateToProfile = () => {
    navigate(`/${username}`);
  };

  const handleDeleteRecipe = async () => {
    if (user && recipeId) {
      const response = await deleteRecipe(user, recipeId);
      if (response) {
        navigateToProfile();
      }
    }
  };

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
    console.log("user", user);
  }, [session, sessionProps, user, userProps]);

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
        setRecipeId(data && data[0]?.recipe_id);
        setTitle(data && data[0]?.title);
        setDescription(data && data[0]?.description);
        setImageUrl(data && data[0]?.image_url);
      });
    }
  }, [userId, recipeParam]);

  useEffect(() => {
    if (recipeId) {
      getDirectionsByRecipeId(recipeId).then((data) => {
        data && setDirections(data);
      });
    }
  }, [recipeId]);

  return (
    <>
      <h1>Recipe</h1>
      <h2>{title}</h2>
      <Link to={`/${username}`}>
        <h3>
          By {username}
          <br />
          <img src={avatarUrl} alt="avatar" height="50px" width="50px" />
        </h3>
      </Link>
      <br />
      {user?.id === userId && (
        <button onClick={navigateToEditRecipe}>Edit Recipe</button>
      )}{" "}
      <img src={imageUrl} alt="recipe" width="120px" height="auto" />
      <p>{description}</p>
      {directions
        .sort((a, b) => a.step_number - b.step_number)
        .map((direction) => (
          <p key={direction.step_number}>
            <b>{direction.step_number}</b> {direction.direction_text}
          </p>
        ))}
      {user?.id === userId && (
        <button onClick={handleDeleteRecipe}>Delete Recipe</button>
      )}{" "}
    </>
  );
}
