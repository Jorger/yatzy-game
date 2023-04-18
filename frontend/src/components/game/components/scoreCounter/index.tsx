import "./styles.css";
import { useInterval } from "../../../../hooks";
import React, { useEffect, useState } from "react";

interface ScoreCounterProps {
  score: number;
  className?: string;
  index?: number;
  intervalTime?: number;
  handleEndTimer?: (index?: number) => void;
}

const ScoreCounter = ({
  score = 0,
  className = "",
  index = 0,
  intervalTime = 50,
  handleEndTimer,
}: ScoreCounterProps) => {
  const [finalScore, setFinalScore] = useState(0);
  const [initialScore, setinItialScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * Efecto que se ejecuta cuando el valor del score cambia
   * Se valida si es difernete al score actual que tiene el componente
   */
  useEffect(() => {
    if (score !== finalScore) {
      setFinalScore(score);
      setIsRunning(true);
    }
  }, [finalScore, score]);

  useInterval(
    () => {
      const newInitialScore = initialScore + 1;
      setinItialScore(newInitialScore);

      if (newInitialScore === finalScore) {
        setIsRunning(false);
        handleEndTimer && handleEndTimer(index);
      }
    },
    isRunning ? intervalTime : null
  );

  return (
    <div className={`${className} ${isRunning ? "score-counter" : ""}`}>
      {initialScore}
    </div>
  );
};

export default React.memo(ScoreCounter);
