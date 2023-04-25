import "./styles.css";
import { useNavigate } from "react-router-dom";
import CircularButton from "../../circularButton";
import React from "react";

const PageWrapper = ({
  children,
  showBack = true,
}: {
  children: JSX.Element | JSX.Element[];
  showBack?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className={`page-container ${showBack ? "back" : ""}`}>
      {showBack && <CircularButton onClick={() => navigate("/")} />}
      {children}
    </div>
  );
};

export default React.memo(PageWrapper);
