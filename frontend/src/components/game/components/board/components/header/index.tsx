import "./styles.css";
import {
  DEFUAL_LABELS_HEADER,
  ETypeGame,
  LABELS_GAME,
} from "../../../../../../utils/constants";
import React from "react";
import type { TypeGame } from "../../../../../../interfaces";

interface BoardItemProps {
  label: string;
  typeGame: TypeGame;
}

const BoardItem = ({
  label = "",
  typeGame = ETypeGame.SOLO,
}: BoardItemProps) => (
  <div className="board-header-panel">
    {typeGame === ETypeGame.SOLO ? (
      label
    ) : (
      <div className="board-header-panel-player">
        <div>
          {
            LABELS_GAME[
              typeGame === ETypeGame.BOT || typeGame === ETypeGame.ONLINE
                ? "YOU"
                : "PLAYER1"
            ]
          }
        </div>
        <div>
          {typeGame === ETypeGame.BOT
            ? LABELS_GAME.BOT
            : typeGame === ETypeGame.ONLINE
            ? LABELS_GAME.THEM
            : LABELS_GAME.PLAYER2}
        </div>
      </div>
    )}
  </div>
);

const BoardHeader = ({ typeGame = ETypeGame.SOLO }: { typeGame: TypeGame }) => (
  <div className="board-header">
    {DEFUAL_LABELS_HEADER.map((label, key) => (
      <BoardItem key={key} label={label} typeGame={typeGame} />
    ))}
  </div>
);

export default React.memo(BoardHeader);
