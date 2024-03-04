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
import {
  addDirections,
  deleteDirections,
  updateDirections,
} from "../../../supabase/directions.functions";
import Direction from "../../interfaces/direction.interface";

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

  const [updatedDirections, setUpdatedDirections] = useState<Direction[]>([]); // Array of Updated Directions

  const [newDirectionsArray, setNewDirectionsArray] = useState<Direction[]>([]);
  const [deletedDirectionsArray, setDeletedDirectionsArray] = useState<
    Direction[]
  >([]);

  const [newIngredientsArray, setNewIngredientsArray] = useState<string[]>([]);

  const [ingredientInputCount, setIngredientInputCount] = useState(0);
  const [textareaCount, setTextareaCount] = useState(0);

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

  async function handleDirectionsUpdate() {
    await Promise.all(
      updatedDirections.map(async (updatedDirection, index) => {
        console.log("Updated Direction", updatedDirection);
        return updateDirections(
          updatedDirection.direction_id!,
          recipeId,
          index + 1,
          updatedDirection.direction_text
        );
      })
    );
  }

  async function handleDirectionsAdd() {
    await Promise.all(
      newDirectionsArray.map(async (newDirection, index) => {
        return addDirections(
          recipeId,
          updatedDirections.length + index + 1,
          newDirection.direction_text
        );
      })
    );
  }

  async function handleDirectionsDelete() {
    await Promise.all(
      deletedDirectionsArray.map(async (deletedDirection) => {
        return deleteDirections(recipeId, deletedDirection.direction_id!);
      })
    );
  }

  async function handleSaveDirections(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleDirectionsDelete();
    await handleDirectionsUpdate();
    await handleDirectionsAdd();
    setNewDirectionsArray([]);
    setDeletedDirectionsArray([]);
  }

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
        data && setUpdatedDirections(data);
      });
    }
  }, [recipeId]);

  useEffect(() => {
    //console.log("Directions", directions);
    console.log("Updated Directions", updatedDirections);
    console.log("New Directions", newDirectionsArray);
    console.log("Deleted Directions", deletedDirectionsArray);
  });

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
            <h2>Igredients</h2>
            <form>
              <div className="edit-ingredient-container">
                <input
                  type="text"
                  className="text-input"
                  style={{ paddingRight: 18 }}
                />
                <img
                  src="/public/icons/remove.svg"
                  alt="delete"
                  width="20px"
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "-3px",
                  }}
                />
              </div>
              <img
                src="/public/icons/add-ellipse.svg"
                alt="add"
                width="30px"
                onClick={() => {}}
              />
            </form>

            <h2>Directions</h2>
            <form onSubmit={handleSaveDirections}>
              {updatedDirections
                .sort((a, b) => a.step_number - b.step_number)
                .map((direction, index) => (
                  <div
                    className="edit-direction-container"
                    key={direction.step_number}
                  >
                    <p>{direction.step_number}</p>
                    <textarea
                      key={direction.step_number}
                      value={direction.direction_text}
                      className="text-input"
                      onChange={(event) => {
                        setUpdatedDirections((prevDirections: Direction[]) => {
                          const updatedDirections = [...prevDirections];
                          updatedDirections[index] = {
                            ...direction,
                            step_number: index + 1,
                            direction_text: event.target.value,
                          } as Direction;
                          return updatedDirections;
                        });
                      }}
                    />
                    <img
                      src="/public/icons/remove.svg"
                      alt="delete"
                      width="20px"
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "-3px",
                      }}
                      onClick={() => {
                        const reUpdatedDirections = updatedDirections
                          .filter((direction, i) => {
                            if (i === index) {
                              setDeletedDirectionsArray((prevDirections) => [
                                ...prevDirections,
                                direction,
                              ]);
                              return false;
                            } else {
                              return true;
                            }
                          })
                          .map((direction, i) => ({
                            ...direction,
                            step_number: i + 1,
                          }));
                        setUpdatedDirections(reUpdatedDirections);
                      }}
                    />
                  </div>
                ))}

              {Array.from({ length: textareaCount }, (_, index) => (
                <div className="edit-direction-container" key={index + 1}>
                  <p>{updatedDirections.length + index + 1}</p>
                  <textarea
                    value={newDirectionsArray[index]?.direction_text}
                    style={{ width: "100%", height: "auto" }}
                    className="text-input"
                    onChange={(event) => {
                      setNewDirectionsArray((prevDirections: Direction[]) => {
                        const newDirections = [...prevDirections];
                        newDirections[index] = {
                          step_number: updatedDirections.length + index + 1,
                          direction_text: event.target.value,
                        } as Direction;
                        return newDirections;
                      });
                    }}
                  />
                  <img
                    src="/public/icons/remove.svg"
                    alt="delete"
                    width="20px"
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "-3px",
                    }}
                    onClick={() => {
                      const newDirections = newDirectionsArray
                        .filter((direction, i) => i !== index)
                        .map((direction, i) => ({
                          ...direction,
                          step_number: updatedDirections.length + i + 1,
                        }));
                      setNewDirectionsArray(newDirections);
                      setTextareaCount(textareaCount - 1);
                    }}
                  />
                </div>
              ))}
              <img
                src="/public/icons/add-ellipse.svg"
                alt="add"
                width="30px"
                onClick={() => {
                  if (
                    newDirectionsArray[textareaCount - 1]?.direction_text ||
                    textareaCount === 0
                  ) {
                    setTextareaCount(textareaCount + 1);
                  }
                }}
              />
              <br />
              <input
                type="submit"
                value="Save"
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
