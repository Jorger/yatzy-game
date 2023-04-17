import "./styles.css";
import React, { ReactNode } from "react";

const GameWrapper = ({
  blockContent = false,
  children,
}: {
  blockContent?: boolean;
  children: JSX.Element | JSX.Element[] | ReactNode;
}) => (
  <div className="game-wrapper">
    {blockContent && <div className="game-wrapper-block-content" />}
    {children}
  </div>
);

export default React.memo(GameWrapper);
