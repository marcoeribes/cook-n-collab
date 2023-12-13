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
  let style: React.CSSProperties = {
    width: "90%",
    height: "90%",
    margin: "0 0 0 5%",
    objectFit: "cover",
    backgroundColor: "white",
    padding: "10px",
    boxSizing: "border-box",
  };
  let imageStyle: React.CSSProperties = {
    width: "75%",
    height: "60%",
    objectFit: "cover",
  };
  return (
    <div style={style}>
      <img style={imageStyle} src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <h3>{subheader}</h3>
    </div>
  );
};

export default RecipeCard;
