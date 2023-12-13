import RecipeCard from "../../components/RecipeCard";
import "./Recipes.css";

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
        {fakeData.slice(0, itemsToShow).map((recipe, index) => (
          <RecipeCard
            key={index}
            imageUrl={recipe.imageUrl}
            title={recipe.title}
            subheader={recipe.subheader}
          />
        ))}
      </div>

      {itemsToShow < fakeData.length ? (
        <button onClick={loadMore}>Load More</button>
      ) : (
        <p>No more recipes to load</p>
      )}
    </>
  );
}

const fakeData = [
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/clamchowder.jpeg",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/wholegraincookies.jpeg",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
  {
    imageUrl: "../../dummy data/classic-waffles.png",
    title: "Classic Waffles",
    subheader: "Breakfast",
  },
];
