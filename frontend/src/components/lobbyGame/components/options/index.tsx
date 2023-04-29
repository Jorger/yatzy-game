import "./styles.css";
import { Link } from "react-router-dom";
import Icon from "../../../icon";
import React from "react";
import Share from "../../../share";

const dataShare = {
  title: "Yatzy ReactJS",
  text: "Play Yatzy ReactJS, a game developed by Jorge Rubiano @ostjh",
  url: window.location.origin,
};

const Options = ({ isAuth = false }: { isAuth: boolean }) => (
  <div className="lobby-game-options">
    <Share data={dataShare}>
      <button className="lobby-game-options-button" title="Share">
        <Icon type="share" />
      </button>
    </Share>
    <Link to="/about" className="lobby-game-options-button" title="About">
      <Icon type="info" />
    </Link>
    {isAuth && (
      <a
        href="/api/logout"
        className="lobby-game-options-button"
        title="Log out"
      >
        <Icon type="logout" />
      </a>
    )}
  </div>
);

export default React.memo(Options);
