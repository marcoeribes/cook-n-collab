import React from "react";

interface RecipeCardProps {
  imageUrl: string;
  title: string;
  subheader: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  imageUrl,
  title,
  subheader,
}) => {
  return (
    <div className="box">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <h3>{subheader}</h3>
    </div>
  );
};

export default RecipeCard;
