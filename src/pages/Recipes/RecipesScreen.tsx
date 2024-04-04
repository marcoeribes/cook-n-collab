import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllRecipes } from "../../../supabase/recipe.functions";
import "./Recipes.css";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import { getUsername } from "../../../supabase/profileFunctions";
import Button from "../../components/button/Button";

export default function RecipesScreen() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [displayCount, setDisplayCount] = useState(12); // Start by displaying 3 recipes

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 12); // Display 3 more recipes
  };

  const generateUrl = async (recipe: any) => {
    const username = await getUsername(recipe.author_id);
    username && navigate(`/${username[0]?.username}/${recipe.title}`);
  };

  useEffect(() => {
    getAllRecipes().then((data) => {
      console.log("recipes", data);
      data && setRecipes(data);
    });
  }, []);

  return (
    <section>
      <h1 className="recipe-heading">Recipes</h1>

      <hr />
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div className="recipe-grid">
          {recipes
            .slice(0, displayCount)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((recipe) => (
              <div
                key={recipe.created_at}
                style={{ textDecoration: "none" }}
                onClick={() => generateUrl(recipe)}
              >
                <RecipeCard
                  key={recipe.recipe_id}
                  imageUrl={recipe.image_url}
                  title={recipe.title}
                  subheader={recipe.subheader}
                />
              </div>
            ))}
        </div>
      </section>
      {displayCount < recipes.length && (
        <Button
          text="Load More"
          style="button primary-button"
          onClick={loadMore}
        />
      )}
    </section>
  );
}
