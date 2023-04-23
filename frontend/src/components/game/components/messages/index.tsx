import "./styles.css";
import React, { useEffect, useState } from "react";

interface GameMessagesProps {
  isYatzy: boolean;
  value: string;
  counter: number;
}

const GameMessages = ({
  isYatzy = false,
  value = "",
  counter = 0,
}: GameMessagesProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (counter !== 0) {
      setShowMessage(true);

      interval = setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [counter]);

  const className = !isYatzy
    ? "game-messages-wrapper"
    : "game-messages-wrapper-yatzy";

  return (
    <div className={`game-messages ${showMessage ? "show" : "hide"}`}>
      <div className={className}>{value}</div>
    </div>
  );
};

export default React.memo(GameMessages);
