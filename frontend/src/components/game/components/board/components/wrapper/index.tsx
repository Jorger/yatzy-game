import React from "react";
import "./styles.css";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const BoardWrapper = ({ children }: WrapperProps) => (
  <div className="board-wrapper">{children}</div>
);

export default React.memo(BoardWrapper);
