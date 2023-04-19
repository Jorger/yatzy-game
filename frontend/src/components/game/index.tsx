import { Board, Dices, GameWrapper, Header } from "./components";
import { EDiceState, EDiceTheme, ETypeGame } from "../../utils/constants";
import {
  getInitalBoardState,
  getInitialDiceValues,
  getInitialPlayers,
  rollDice,
  selectDice,
} from "./helpers";
import React, { useState } from "react";
import type {
  DiceState,
  DiceTheme,
  TotalPlayers,
  TypeGame,
} from "../../interfaces";

interface GameProps {
  typeGame?: TypeGame;
  initialTurn?: TotalPlayers;
}

const Game = ({ typeGame = ETypeGame.SOLO, initialTurn = 1 }: GameProps) => {
  // Guarda el estado del board
  // setBoardState
  const [boardState] = useState(getInitalBoardState);
  // Estado de los jugadores del juego (máximo serán dos)...
  // setPlayers
  const [players] = useState(() => getInitialPlayers(typeGame));
  // Para el turno, setTurn
  const [turn] = useState<TotalPlayers>(initialTurn);
  // Estado de los dados..
  const [diceValues, setDiceValues] = useState(() => getInitialDiceValues());
  // Estado de animación de los dados...
  const [dieState, setDieState] = useState<DiceState>(EDiceState.HIDE);

  /**
   * Evento que se ejecuta una vez ha terminado de girar los dados...
   */
  const handleDoneDices = () => {
    console.log("Termina");
    setDieState(EDiceState.STOPPED);
  };

  const handleSelectDice = (index: number) => {
    setDiceValues(selectDice(diceValues, index));
  };

  /**
   * Función que retorna cuando el contador de tiempo ha finalizado
   * Sólo se ejecutará el tipo Online...
   * @param player
   */
  const onEndCountdown = (player: TotalPlayers) => {
    console.log({ player });
  };

  /**
   * Sólo se agrega el cronometro cuando es online...
   */
  const countdown =
    typeGame === ETypeGame.ONLINE ? { stop: false, onEndCountdown } : undefined;

  /**
   * Sólo será blanco para dos juagdores si s esta jugando con un amigo
   * De lo contrario, cuando tiene el turno el jugador dos, de los otros tipos
   * el color cambiará a rojo...
   */
  const diceTheme: DiceTheme = EDiceTheme.WHITE;

  return (
    <GameWrapper>
      <Header countdown={countdown} players={players} turn={turn} />
      <Board
        items={boardState}
        players={players}
        thrownDice={true}
        turn={turn}
        typeGame={typeGame}
        handleClick={(item, player) => {
          console.log(item, player);
        }}
      />
      <Dices
        dieState={dieState}
        values={diceValues}
        diceTheme={diceTheme}
        handleDoneDices={handleDoneDices}
        handleSelectDice={handleSelectDice}
      />
      <button
        onClick={() => {
          setDiceValues(rollDice(diceValues));
          setDieState(EDiceState.SPIN);
        }}
      >
        Roll
      </button>
    </GameWrapper>
  );
};

export default React.memo(Game);
