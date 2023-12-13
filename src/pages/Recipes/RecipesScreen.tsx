import RecipeCard from "../../components/RecipeCard";
import "./Recipes.css";

export default function RecipesScreen() {
  return (
    <>
      <h1>Recipes</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          backgroundColor: "blue",
        }}
      >
        {fakeData.map((recipe, index) => (
          <RecipeCard
            key={index}
            imageUrl={recipe.imageUrl}
            title={recipe.title}
            subheader={recipe.subheader}
          />
        ))}
      </div>
    </>
  );
}

const fakeData = [
  { imageUrl: "url1", title: "Recipe 1", subheader: "Subheader 1" },
  { imageUrl: "url2", title: "Recipe 2", subheader: "Subheader 2" },
  { imageUrl: "url3", title: "Recipe 3", subheader: "Subheader 3" },
  { imageUrl: "url4", title: "Recipe 4", subheader: "Subheader 4" },
  { imageUrl: "url5", title: "Recipe 5", subheader: "Subheader 5" },
  { imageUrl: "url6", title: "Recipe 6", subheader: "Subheader 6" },
  { imageUrl: "url7", title: "Recipe 7", subheader: "Subheader 7" },
  { imageUrl: "url8", title: "Recipe 8", subheader: "Subheader 8" },
  { imageUrl: "url9", title: "Recipe 9", subheader: "Subheader 9" },
  { imageUrl: "url1", title: "Recipe 1", subheader: "Subheader 1" },
  { imageUrl: "url2", title: "Recipe 2", subheader: "Subheader 2" },
  { imageUrl: "url3", title: "Recipe 3", subheader: "Subheader 3" },
  { imageUrl: "url4", title: "Recipe 4", subheader: "Subheader 4" },
  { imageUrl: "url5", title: "Recipe 5", subheader: "Subheader 5" },
  { imageUrl: "url6", title: "Recipe 6", subheader: "Subheader 6" },
  { imageUrl: "url7", title: "Recipe 7", subheader: "Subheader 7" },
  { imageUrl: "url8", title: "Recipe 8", subheader: "Subheader 8" },
  { imageUrl: "url9", title: "Recipe 9", subheader: "Subheader 9" },
  { imageUrl: "url1", title: "Recipe 1", subheader: "Subheader 1" },
  { imageUrl: "url2", title: "Recipe 2", subheader: "Subheader 2" },
  { imageUrl: "url3", title: "Recipe 3", subheader: "Subheader 3" },
  { imageUrl: "url4", title: "Recipe 4", subheader: "Subheader 4" },
  { imageUrl: "url5", title: "Recipe 5", subheader: "Subheader 5" },
  { imageUrl: "url6", title: "Recipe 6", subheader: "Subheader 6" },
  { imageUrl: "url7", title: "Recipe 7", subheader: "Subheader 7" },
  { imageUrl: "url8", title: "Recipe 8", subheader: "Subheader 8" },
  { imageUrl: "url9", title: "Recipe 9", subheader: "Subheader 9" },
];
