import "./styles.css";
import defaulImage from "./default.png";
import React from "react";

interface AvatarImageProps {
  photo: string;
  name: string;
}

const AvatarImage = ({ photo = "", name = "" }: AvatarImageProps) => {
  return (
    <img
      alt="Avatar"
      className="avatar-image"
      src={photo || defaulImage}
      title={name}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = defaulImage;
      }}
    />
  );
};

export default React.memo(AvatarImage);
