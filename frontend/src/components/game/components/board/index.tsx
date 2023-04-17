import { BoardHeader, BoardTable, BoardWrapper } from "./components";
import React from "react";
import type {
  IBoard,
  IBoardItem,
  Player,
  TotalPlayers,
  TypeGame,
} from "../../../../interfaces";

interface BoardProps {
  items: IBoard;
  players: Player[];
  thrownDice?: boolean;
  turn?: TotalPlayers;
  typeGame?: TypeGame;
  handleClick: (item: IBoardItem, player: TotalPlayers) => void;
}

const Board = (props: BoardProps) => (
  <BoardWrapper>
    <BoardHeader typeGame={props.typeGame as TypeGame} />
    <BoardTable {...props} />
  </BoardWrapper>
);

export default React.memo(Board);
