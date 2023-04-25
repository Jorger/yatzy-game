import { Difficulty, TotalPlayers } from "../interfaces";
import { ETypeGame } from "../utils/constants";
import { randomNumber } from "../utils/helpers";
import { useParams } from "react-router-dom";
import GameDifficulty from "../components/gameDifficulty";
import Loading from "../components/loading";
import React, { Suspense, lazy, useState } from "react";
import type { TypeGame } from "../interfaces";

const Game = lazy(() => import("../components/game"));

const GamePage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    undefined
  );
  // Se extrae el tipo de juego de la URL...
  const { type } = useParams();
  // Se convierte a mayúsculas para que coincida con el tipo...
  const typeURL = (type?.toUpperCase() as TypeGame) || ETypeGame.SOLO;

  // Se valida que el tipo exista...
  const validate = Object.keys(ETypeGame).includes(typeURL)
    ? typeURL
    : ETypeGame.SOLO;

  // Se valida que el tipo no sea online...
  const typeGame = validate !== ETypeGame.ONLINE ? validate : ETypeGame.SOLO;

  // Para indicar el turno inicial...
  const initialTurn =
    typeGame !== ETypeGame.SOLO ? (randomNumber(1, 2) as TotalPlayers) : 1;

  // Si es de tipo bot, se renderiza un componente,
  // que permite al usuario elegir el nivel de dificultad...
  if (!difficulty && typeGame === ETypeGame.BOT) {
    return (
      <GameDifficulty handleDifficulty={(value) => setDifficulty(value)} />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Game
        difficulty={difficulty}
        initialTurn={initialTurn}
        typeGame={typeGame}
      />
    </Suspense>
  );
};

export default React.memo(GamePage);
