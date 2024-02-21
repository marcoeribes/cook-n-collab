import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProfileByUsername } from "../../../supabase/profileFunctions";
import {
  getDirectionsByRecipeId,
  getRecipeByUserIdAndRecipeTitle,
} from "../../../supabase/recipe.functions";
import SessionProps from "../../interfaces/auth.interface";
import { Session, User } from "@supabase/supabase-js";

export default function EditRecipeScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const { usernameParam, recipeParam } = useParams();

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [userId, setUserId] = useState<string | undefined>("");

  const [recipeId, setRecipeId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [directions, setDirections] = useState<any[]>([]);

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
    console.log("user", user);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (usernameParam) {
      getProfileByUsername(usernameParam).then((data: any) => {
        setUserId(data && data[0]?.profile_id);
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
      {user?.id === userId ? (
        <>
          <h1>Edit Recipe</h1>
          <div>
            <h4>Change Recipe Title</h4>
            <input value={title} />
          </div>
          <img src={imageUrl} alt="recipe" width="120px" height="auto" />
          <h4>Edit Description</h4>
          <input value={description} />
          {directions
            .sort((a, b) => a.step_number - b.step_number)
            .map((direction) => (
              <>
                <p key={direction.step_number}>
                  {direction.step_number}
                  <textarea
                    value={direction.direction_text}
                    style={{ width: "100%", height: "auto" }}
                  />{" "}
                </p>
              </>
            ))}
        </>
      ) : (
        <p>Access unavailable</p>
      )}
    </>
  );
}
