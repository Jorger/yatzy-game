import "./styles.css";
import React from "react";

interface ButtonGroupProps {
  children: JSX.Element | JSX.Element[];
  label: string;
}

const ButtonGroup = ({ children, label = "" }: ButtonGroupProps) => (
  <div className="button-group">
    <div className="button-group-header">{label}</div>
    {children}
  </div>
);

export default React.memo(ButtonGroup);
