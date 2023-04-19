import { DiceButton, DiceWrapper } from "./components";
import { EDiceState, EDiceTheme } from "../../../../utils/constants";
import { handleAllDiceComplete } from "./helpers";
import React from "react";
import type { DiceState, DiceTheme, DiceValue } from "../../../../interfaces";

interface DicesProps {
  diceTheme: DiceTheme;
  dieState: DiceState;
  values: DiceValue[];
  handleDoneDices: () => void;
  handleSelectDice: (index: number) => void;
}

const Dices = ({
  diceTheme = EDiceTheme.WHITE,
  dieState = EDiceState.HIDE,
  values = [],
  handleDoneDices,
  handleSelectDice,
}: DicesProps) => (
  <DiceWrapper>
    {values.map((value) => (
      <DiceButton
        dice={value}
        diceTheme={diceTheme}
        dieState={dieState}
        key={`dice-${value.index}`}
        handleSelectDice={handleSelectDice}
        handleDone={() =>
          dieState === EDiceState.SPIN &&
          handleAllDiceComplete(value.index + 1, values, handleDoneDices)
        }
      />
    ))}
  </DiceWrapper>
);

export default React.memo(Dices);
