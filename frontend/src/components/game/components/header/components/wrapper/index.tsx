import "./styles.css";
import React from "react";

interface HeaderWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const HeaderWrapper = ({ children }: HeaderWrapperProps) => (
  <div className="header-wrapper">{children}</div>
);

export default React.memo(HeaderWrapper);
