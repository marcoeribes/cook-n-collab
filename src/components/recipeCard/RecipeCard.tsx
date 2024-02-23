import React from "react";

interface RecipeCardProps {
  imageUrl: string;
  title: string;
  subheader: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ imageUrl, title }) => {
  let style: React.CSSProperties = {
    boxSizing: "border-box",
    padding: "0px",
    //border: "1px solid #777",
  };
  let imageStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
  };
  let titleStyle: React.CSSProperties = {
    margin: 0,
    marginTop: 5,
    marginBottom: 5,
    fontSize: "18px",
    fontWeight: "lighter",
    border: "1px solid #777",
  };
  return (
    <div style={style}>
      <img style={imageStyle} src={imageUrl} alt={title} />
      <h4 style={titleStyle}>{title}</h4>
    </div>
  );
};

export default RecipeCard;
