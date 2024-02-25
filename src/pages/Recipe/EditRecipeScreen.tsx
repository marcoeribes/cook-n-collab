import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProfileByUsername } from "../../../supabase/profileFunctions";
import {
  getDirectionsByRecipeId,
  getRecipeByUserIdAndRecipeTitle,
  updateRecipe,
} from "../../../supabase/recipe.functions";
import SessionProps from "../../interfaces/auth.interface";
import { Session, User } from "@supabase/supabase-js";
import {
  deleteRecipeImage,
  fetchDefaultRecipeImageUrl,
  fetchRecipeImage,
  fetchRecipeImageUrl,
  uploadRecipeImage,
} from "../../../supabase/recipe-image.functions";
import { updateDirections } from "../../../supabase/directions.functions";

export default function EditRecipeScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();
  const { usernameParam, recipeParam } = useParams();

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [userId, setUserId] = useState<string | undefined>("");

  const [recipeId, setRecipeId] = useState<string>("");

  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  /* From Storage Bucket */
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeImageUrl, setRecipeImageUrl] = useState("");
  /* From Storage Bucket */

  const [directions, setDirections] = useState<any[]>([]);
  const [newDirections, setNewDirections] = useState<any[]>([]);

  const navigateToNewTitleRecipe = () => {
    navigate(`/${usernameParam}/${newTitle}/edit`);
  };

  const handleRecipeInfoUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      user &&
      user?.id === userId &&
      (title !== newTitle || description !== newDescription)
    ) {
      const response = await updateRecipe(
        user,
        recipeId,
        newTitle,
        newDescription
      );
      if (response) {
        navigateToNewTitleRecipe();
      }
    }
  };

  async function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!user || !recipeId) return;

    if (recipeImage) await deleteRecipeImage(user, recipeId, recipeImage);

    const result = await uploadRecipeImage(user, recipeId, event);
    if (result) {
      await updateRecipeImage(result.imageName);
    }
  }

  async function updateRecipeImage(imageName: string) {
    if (!user || !recipeId) return;

    setRecipeImage(imageName);

    if (imageName) {
      setImageUrl(`${recipeImageUrl}${imageName}`);
      const response = await updateRecipe(
        user,
        recipeId,
        undefined,
        undefined,
        `${recipeImageUrl}${imageName}`
      );
      if (response) {
        const data = await getRecipeByUserIdAndRecipeTitle(user?.id, title);
        console.log("NEW RECIPE INFORMATION", data);
      }
    } else {
      const defaultUrl = await fetchDefaultRecipeImageUrl();
      setImageUrl(defaultUrl as string);
      await updateRecipe(
        user,
        recipeId,
        undefined,
        undefined,
        defaultUrl as string
      );
    }
  }

  const handleDirectionsUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (user?.id === userId && recipeId) {
      console.log("DIRECTIONS", directions);
      console.log("NEW DIRECTIONS", newDirections);
      newDirections.map(async (newDirectionText, index) => {
        if (newDirectionText !== directions[index].direction_text) {
          await updateDirections(
            (index + 1).toString(),
            recipeId,
            newDirectionText
          );
        }
      });
    }
  };

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (usernameParam) {
      getProfileByUsername(usernameParam).then((data: any) => {
        setUserId(data && data[0]?.profile_id);
      });
    }
  }, [usernameParam]);

  useEffect(() => {
    if (user && recipeId) {
      Promise.all([
        fetchRecipeImageUrl(user, recipeId),
        fetchRecipeImage(user, recipeId),
      ]).then(([imageUrlData, imageData]) => {
        imageUrlData && setRecipeImageUrl(imageUrlData);
        imageData && setRecipeImage(imageData[0]?.name);
        imageUrlData &&
          imageData &&
          setImageUrl(`${imageUrlData}${imageData[0]?.name}`);
      });
    }
  }, [user, recipeId]);

  useEffect(() => {
    if (userId && recipeParam) {
      getRecipeByUserIdAndRecipeTitle(userId, recipeParam).then((data) => {
        setRecipeId(data && data[0]?.recipe_id);
        setTitle(data && data[0]?.title);
        setDescription(data && data[0]?.description);
        setImageUrl(data && data[0]?.image_url);
        setNewTitle(title);
        setNewDescription(description);
      });
    }
  }, [userId, recipeParam, title, description, imageUrl]);

  useEffect(() => {
    if (recipeId) {
      getDirectionsByRecipeId(recipeId).then((data) => {
        data && setDirections(data);
        data?.map((directionText) => {
          setNewDirections((prevDirections) => [
            ...prevDirections,
            directionText.direction_text,
          ]);
        });
      });
    }
  }, [recipeId]);

  return (
    <>
      {user?.id === userId ? (
        <section style={{}}>
          <h2 className="recipe-title">Edit Recipe</h2>
          <div className="center-items">
            <form
              onSubmit={handleRecipeInfoUpdate}
              className="edit-recipe-form"
            >
              <label>Change Recipe Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="text-input"
                style={{ marginBottom: "10px" }}
                required
              />

              <label>Edit Description</label>
              <input
                type="text"
                value={newDescription}
                className="text-input" // Can be Global
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <input
                type="submit"
                value={"Save"}
                className="button tertiary-button"
                style={{ margin: "10px 0px 40px" }}
              />
            </form>
          </div>
          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
            <img src={imageUrl} alt="recipe" width="300px" height="auto" />
          </label>
          <div className="center-items">
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
            <div
              className="button tertiary-button"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                width: "82px",
              }}
            >
              <label htmlFor="file-upload">Upload</label>
            </div>
          </div>

          {/* Recipe Info Stuff */}
          <div className="recipe-info-container">
            <form onSubmit={handleDirectionsUpdate}>
              {directions
                .sort((a, b) => a.step_number - b.step_number)
                .map((direction) => (
                  <div
                    style={{
                      display: "flex",
                      width: "400px",
                      gap: "10px",
                      margin: "10px",
                    }}
                    key={direction.step_number}
                  >
                    <p>{direction.step_number}</p>
                    <textarea
                      value={newDirections[direction.step_number - 1]}
                      style={{ width: "100%", height: "auto" }}
                      className="text-input"
                      onChange={(event) => {
                        setNewDirections((prevDirections) =>
                          prevDirections.map((dir, index) =>
                            index === direction.step_number - 1
                              ? event.target.value
                              : dir
                          )
                        );
                      }}
                    />
                  </div>
                ))}
              <img src="/public/icons/add-ellipse.svg" alt="add" width="30px" />
              <br />
              <input
                type="submit"
                value={"Save"}
                className="button tertiary-button"
                style={{ margin: "10px 0px 40px" }}
              />
            </form>
          </div>
        </section>
      ) : (
        <p>Access unavailable</p>
      )}
    </>
  );
}
