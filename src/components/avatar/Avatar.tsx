const Avatar = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <img
      src={imageUrl}
      alt="avatar"
      style={{ borderRadius: "50%", width: "300px", height: "300px" }}
    />
  );
};

export default Avatar;
