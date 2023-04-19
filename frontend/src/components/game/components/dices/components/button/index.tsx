import "./styles.css";
import { EDiceState, EDiceTheme } from "../../../../../../utils/constants";
import React, { useEffect, useRef } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";
import type {
  DiceState,
  DiceTheme,
  DiceValue,
} from "../../../../../../interfaces";

interface DiceButtonProps {
  dice: DiceValue;
  diceTheme: DiceTheme;
  dieState: DiceState;
  handleDone: () => void;
  handleSelectDice: (index: number) => void;
}

type Theme = { [key in DiceTheme]: { dotColor: string; faceColor: string } };

const theme: Theme = {
  WHITE: {
    dotColor: "black",
    faceColor: "white",
  },
  RED: {
    dotColor: "white",
    faceColor: "red",
  },
};

const DiceButton = ({
  dice = { index: 0, value: 0, selected: false },
  diceTheme = EDiceTheme.WHITE,
  dieState = EDiceState.HIDE,
  handleDone,
  handleSelectDice,
}: DiceButtonProps) => {
  // Guarda la referencia del dado para poder usar la función de tipo rollAll
  // https://www.npmjs.com/package/react-dice-complete
  const refDice = useRef<ReactDiceRef>(null);

  // Determina la velocidad de gira de cada dado...
  const rollTime =
    dieState === EDiceState.SPIN && !dice.selected
      ? 0.5 + dice.index * 0.15
      : 0;

  // Para el título de botón (accesibilidad)
  const title =
    `Dice ${dice.index + 1}` +
    (dieState === EDiceState.STOPPED ? ` = ${dice.value}` : "");

  // Asocia la clase de selección del dado
  // Además de la clase para ocultarlo...
  const className = `dices-button ${dice.selected ? "selected" : ""} ${
    dieState === EDiceState.HIDE ? "hide" : ""
  }`;

  /**
   * Bloquea el botón si el dado está oculto o si está rotanto
   * O si el tema es rojo indicando que es otro jugador...
   */
  const disabledButton =
    !(dieState === EDiceState.STOPPED) || diceTheme === EDiceTheme.RED;

  // Establece el color del dado...
  const { dotColor, faceColor } = theme[diceTheme];

  /**
   * Efecto que se ejecuta cuando el valor del dado ha cambiado...
   */
  useEffect(() => {
    const { value, selected } = dice;

    // Establece si debe girar el dado, en este caso con el valor de value
    // pero si está seleccionado no hará ninguna acción...
    if (value !== 0 && !selected) {
      refDice.current?.rollAll([value]);
    }
  }, [refDice, dice]);

  return (
    <button
      className={className}
      disabled={disabledButton}
      title={title}
      onClick={() => handleSelectDice(dice.index)}
    >
      <ReactDice
        dieSize={52}
        disableIndividual
        dotColor={dotColor}
        faceColor={faceColor}
        numDice={1}
        outline
        outlineColor="white"
        rollDone={handleDone}
        rollTime={rollTime}
        ref={refDice}
      />
    </button>
  );
};

export default React.memo(DiceButton);
