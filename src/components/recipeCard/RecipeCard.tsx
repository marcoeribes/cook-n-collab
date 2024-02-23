import React from "react";
import "./RecipeCard.css";

interface RecipeCardProps {
  imageUrl: string;
  title: string;
  subheader: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="recipe-card">
      <img className="recipe-card-image" src={imageUrl} alt={title} />
      <h4 className="recipe-card-title">{title}</h4>
    </div>
  );
};

export default RecipeCard;
