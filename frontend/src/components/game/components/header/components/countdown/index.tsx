import "./styles.css";
import { useInterval } from "../../../../../../hooks";
import {
  INTERVAL_TIME,
  INTERVAL_VALUE_COUNTDOWN,
} from "../../../../../../utils/constants";
import React, { useEffect, useState } from "react";

interface CountdownProps {
  initialValue?: number;
  intervalTime?: number;
  stopCounter?: boolean;
  handleEndCountdown: () => void;
}

const Countdown = ({
  initialValue = INTERVAL_VALUE_COUNTDOWN,
  intervalTime = INTERVAL_TIME,
  stopCounter = false,
  handleEndCountdown,
}: CountdownProps) => {
  const [count, setCount] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => setIsRunning(!stopCounter), [stopCounter]);

  useInterval(
    () => {
      const newCount = count - 1;
      if (newCount >= 0) {
        setCount(newCount);
      }

      if (newCount === 0) {
        setIsRunning(false);
        handleEndCountdown();
      }
    },
    isRunning ? intervalTime : null
  );

  return (
    <div
      className={`header-players-countdown ${count <= 10 ? "end-time" : ""}`}
    >
      {`${count <= 9 ? `0${count}` : count}`}
    </div>
  );
};

export default React.memo(Countdown);
