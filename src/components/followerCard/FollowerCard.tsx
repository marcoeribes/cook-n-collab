import React from "react";
import "./FollowerCard.css";

interface RecipeCardProps {
  avatarUrl: string;
  username: string;
  onClick?: () => void; // Add onClick prop
}

const FollowerCard: React.FC<RecipeCardProps> = ({
  avatarUrl,
  username,
  onClick,
}) => {
  return (
    <div
      onClick={onClick} // Add onClick prop
      className="follower-card"
    >
      <img className="follower-card-avatar" src={avatarUrl} alt="avatar" />
      <h4 className="follwer-card-username">{username}</h4>
    </div>
  );
};

export default FollowerCard;
