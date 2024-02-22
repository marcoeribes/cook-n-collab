import RecipeCard from "../../components/RecipeCard";
import "./Recipes.css";
import { Link } from "react-router-dom";

import { useState } from "react";

export default function RecipesScreen() {
  const [itemsToShow, setItemsToShow] = useState(3);

  const loadMore = () => {
    setItemsToShow((prev) => prev + 3);
  };

  return (
    <>
      <h1>Recipes</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*fakeData.slice(0, itemsToShow).map((recipe, index) => (
          <Link to={`/recipe/${recipe.id}`} key={index}>
            <RecipeCard
              key={index}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              subheader={recipe.subheader}
            />
          </Link>
        ))*/}
      </div>

      {itemsToShow < fakeData.length ? (
        <button onClick={loadMore}>Load More</button>
      ) : (
        <p>No more recipes to load</p>
      )}
    </>
  );
}
