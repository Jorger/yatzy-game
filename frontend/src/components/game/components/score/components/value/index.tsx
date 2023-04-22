import "./styles.css";
import { ScoreCounter } from "../../..";
import React from "react";

interface ScoreValueProps {
  index: number;
  score: number;
  name?: string;
  handleShowScore: () => void;
}

const ScoreValue = ({
  index = 0,
  score = 0,
  name = "",
  handleShowScore,
}: ScoreValueProps) => (
  <div className={`score-game-value-item item-${index}`}>
    <ScoreCounter
      className="score-game-value-value"
      index={index}
      intervalTime={10}
      score={score}
      handleEndTimer={handleShowScore}
    />
    {name && <div className="score-game-value-name">{name}</div>}
  </div>
);

export default React.memo(ScoreValue);
