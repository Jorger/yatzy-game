import "./styles.css";
import React from "react";

const DiceWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => <div className="dices-wrapper">{children}</div>;

export default React.memo(DiceWrapper);
