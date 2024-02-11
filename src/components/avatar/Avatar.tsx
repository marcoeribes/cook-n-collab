const Avatar = ({ imageUrl, size }: { imageUrl: string; size: number }) => {
  return (
    <img
      src={imageUrl}
      alt="avatar"
      style={{ borderRadius: "50%", width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Avatar;
