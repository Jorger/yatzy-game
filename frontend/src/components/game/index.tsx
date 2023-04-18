import { Board, GameWrapper, Header } from "./components";
import { ETypeGame } from "../../utils/constants";
import { getInitalBoardState, getInitialPlayers } from "./helpers";
import type { TotalPlayers, TypeGame } from "../../interfaces";
import React, { useState } from "react";

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

  const onEndCountdown = (player: TotalPlayers) => {
    console.log({ player });
  };

  /**
   * Sólo se agrega el cronometro cuando es online...
   */
  const countdown =
    typeGame === ETypeGame.ONLINE ? { stop: false, onEndCountdown } : undefined;

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
    </GameWrapper>
  );
};

export default React.memo(Game);
