import "./styles.css";
import {
  ETypeButtonGame,
  LABELS_GAME,
  TOTAL_THROWING,
} from "../../../../utils/constants";
import React from "react";
import type { TypeButtonGame } from "../../../../interfaces";

interface ButtonsProps {
  disabledPlay: boolean;
  disabledRoll: boolean;
  showPlay: boolean;
  throwing: number;
  handleClick: (type: TypeButtonGame) => void;
}

const Buttons = ({
  disabledPlay = false,
  disabledRoll = false,
  showPlay = false,
  throwing = TOTAL_THROWING,
  handleClick,
}: ButtonsProps) => (
  <div className="game-buttons">
    <button
      className="button game-buttons-roll"
      disabled={disabledRoll}
      onClick={() => handleClick(ETypeButtonGame.ROLL)}
    >
      {LABELS_GAME.ROLL}
      <span>{throwing}</span>
    </button>
    {showPlay && (
      <button
        className="button orange"
        disabled={disabledPlay}
        onClick={() => handleClick(ETypeButtonGame.PLAY)}
      >
        {LABELS_GAME.PLAY}
      </button>
    )}
  </div>
);

export default React.memo(Buttons);
