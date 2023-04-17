import { BoardHeader, BoardWrapper } from "./components";
import { ETypeGame } from "../../../../utils/constants";
import React from "react";
import type { TypeGame } from "../../../../interfaces";

interface BoardProps {
  typeGame?: TypeGame;
}

const Board = ({ typeGame = ETypeGame.SOLO }: BoardProps) => {
  return (
    <BoardWrapper>
      <BoardHeader typeGame={typeGame} />
    </BoardWrapper>
  );
};

export default React.memo(Board);
