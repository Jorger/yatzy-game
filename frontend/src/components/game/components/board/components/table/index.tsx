import "./styles.css";
import { BoardRows, BoardScore } from "../index";
import { ETypeGame } from "../../../../../../utils/constants";
import React from "react";
import type {
  IBoard,
  IBoardItem,
  Player,
  TotalPlayers,
  TypeGame,
} from "../../../../../../interfaces";

interface BoardTableProps {
  items: IBoard;
  players: Player[];
  thrownDice?: boolean;
  turn?: TotalPlayers;
  typeGame?: TypeGame;
  handleClick: (item: IBoardItem, player: TotalPlayers) => void;
}

const BoardTable = ({
  items,
  players,
  thrownDice = false,
  turn = 1,
  typeGame = ETypeGame.SOLO,
  handleClick,
}: BoardTableProps) => (
  <div className="board-table-row-wrapper">
    {new Array(7).fill(null).map((_, index) => (
      <div className="board-table-row" key={index}>
        <div className="board-table-row-item">
          {index < 6 ? (
            <BoardRows
              item={items.UPPER_SECTION[index]}
              thrownDice={thrownDice}
              turn={turn}
              typeGame={typeGame}
              handleClick={handleClick}
            />
          ) : (
            <BoardScore players={players} />
          )}
        </div>
        <div className="board-table-row-item">
          <BoardRows
            item={items.LOWER_SECTION[index]}
            thrownDice={thrownDice}
            turn={turn}
            typeGame={typeGame}
            handleClick={handleClick}
          />
        </div>
      </div>
    ))}
  </div>
);

export default React.memo(BoardTable);
