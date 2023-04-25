import "./styles.css";
import { BoardItem } from "../game/components/board/components";
import { randomNumber } from "../../utils/helpers";
import React, { useState } from "react";
import type { valueDice } from "../../interfaces";

const Logo = () => {
  const [diceValue] = useState(randomNumber(1, 6));

  return (
    <div className="logo">
      <h1 className="logo-label">YATZY</h1>
      <div className="logo-dices">
        {new Array(5).fill(null).map((_, index) => (
          <BoardItem key={index} value={diceValue as valueDice} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Logo);
