import "./styles.css";
import Icon from "../icon";
import React from "react";
import type { TypeIcon } from "../icon";

interface CircularButtonProps {
  type?: TypeIcon;
  onClick: () => void;
}

const CircularButton = ({ type = "back", onClick }: CircularButtonProps) => (
  <button className="circular-button" onClick={onClick}>
    <Icon type={type} fill="white" />
  </button>
);

export default React.memo(CircularButton);
