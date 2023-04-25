import "./styles.css";
import { ButtonGroup } from "../../../wrappers";
import { Link } from "react-router-dom";
import React from "react";

const LINKS = [
  {
    label: "Solo",
    path: "/game/solo",
  },
  // {
  //   label: "Online",
  //   path: "/online",
  // },
  {
    label: "Vs a Friend",
    path: "/game/friend",
  },
  {
    label: "VS a Bot",
    path: "/game/bot",
  },
];

const Links = () => (
  <div className="lobby-game-links">
    <ButtonGroup label="Play">
      <div className="lobby-game-links-link">
        {LINKS.map(({ label, path }, key) => {
          return (
            <Link className="button orange" key={key} to={path}>
              {label}
            </Link>
          );
        })}
      </div>
    </ButtonGroup>
  </div>
);

export default React.memo(Links);
