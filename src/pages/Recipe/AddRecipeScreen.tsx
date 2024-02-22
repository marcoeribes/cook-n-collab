import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../../../supabase/profileFunctions";
import { addRecipe } from "../../../supabase/recipe.functions";
import SessionProps from "../../interfaces/auth.interface";
import { Session, User } from "@supabase/supabase-js";

export default function AddRecipeScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [username, setUsername] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const recipeImageUrl =
    "https://pfrmlsmgjrdyiccuhyyi.supabase.co/storage/v1/object/public/recipes/default-recipe2.jpg";

  const navigateToNewRecipe = () => {
    navigate(`/${username}/${title}/edit`);
  };

  const navigateToProfile = () => {
    navigate(`/${username}`);
  };

  const handleAddRecipe = async (event: React.FormEvent<HTMLFormElement>) => {
    if (user && title) {
      event.preventDefault();
      console.log("title", title, "& description", description);
      const response = await addRecipe(
        user,
        title,
        description,
        recipeImageUrl
      );
      if (response) {
        navigateToNewRecipe();
      }
    }
  };

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
      });
    }
  }, [user]);

  return (
    <>
      <p>Username: {username}</p>
      <h1>Add Recipe</h1>
      <form onSubmit={handleAddRecipe}>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <input type="submit" value="Save" />
        <button onClick={navigateToProfile}>Cancel</button>
      </form>
    </>
  );
}
