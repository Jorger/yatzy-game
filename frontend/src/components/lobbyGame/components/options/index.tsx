import "./styles.css";
import { Link } from "react-router-dom";
import Icon from "../../../icon";
import React from "react";

const Options = () => (
  <div className="lobby-game-options">
    <button className="lobby-game-options-button" title="Share">
      <Icon type="share" />
    </button>
    <Link to="/about" className="lobby-game-options-button" title="About">
      <Icon type="info" />
    </Link>
  </div>
);

export default React.memo(Options);
