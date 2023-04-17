import { Board, GameWrapper } from "./components";
import { ETypeGame } from "../../utils/constants";
import { getInitalBoardState, getInitialPlayers } from "./helpers";
import { TypeGame } from "../../interfaces";
import React, { useState } from "react";

interface GameProps {
  typeGame?: TypeGame;
}

const Game = ({ typeGame = ETypeGame.SOLO }: GameProps) => {
  // Guarda el estado del board
  // setBoardState
  const [boardState] = useState(getInitalBoardState);
  // Estado de los jugadores del juego (máximo serán dos)...
  // setPlayers
  const [players] = useState(() => getInitialPlayers(typeGame));

  return (
    <GameWrapper>
      <Board
        items={boardState}
        players={players}
        thrownDice={true}
        turn={1}
        typeGame={typeGame}
        handleClick={(item, player) => {
          console.log(item, player);
        }}
      />
    </GameWrapper>
  );
};

export default React.memo(Game);
