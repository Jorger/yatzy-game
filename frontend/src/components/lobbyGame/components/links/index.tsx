import "./styles.css";
import { ButtonGroup } from "../../../wrappers";
import { Link } from "react-router-dom";
import React from "react";
import type { IAuth } from "../../../../interfaces";

const LINKS = [
  {
    label: "Solo",
    path: "/game/solo",
  },
  {
    label: "Online",
    path: "/online",
  },
  {
    label: "Vs a Friend",
    path: "/game/friend",
  },
  {
    label: "VS a Bot",
    path: "/game/bot",
  },
];

const Links = ({ state }: { state: IAuth | null }) => (
  <div className="lobby-game-links">
    <ButtonGroup label="Play">
      <div className="lobby-game-links-link">
        {LINKS.map(({ label, path }, key) => {
          // Valida si puede o no mostrar el link de online
          // esto sucede si el api no responde, entonces el estado sería null
          const renderLink =
            (label === "Online" && !!state) || label !== "Online";

          return (
            renderLink && (
              <Link className="button orange" key={key} to={path}>
                {label}
              </Link>
            )
          );
        })}
      </div>
    </ButtonGroup>
  </div>
);

export default React.memo(Links);
