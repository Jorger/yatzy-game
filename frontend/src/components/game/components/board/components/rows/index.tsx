import "./styles.css";
import React from "react";
import type {
  IBoardItem,
  TotalPlayers,
  TypeGame,
} from "../../../../../../interfaces";
import { ETypeGame, YATZY_SCORES } from "../../../../../../utils/constants";
import { BoardItem } from "..";

interface BoardRowsProps {
  item: IBoardItem;
  thrownDice?: boolean;
  typeGame?: TypeGame;
  turn?: TotalPlayers;
  handleClick: (item: IBoardItem, player: TotalPlayers) => void;
}

interface BoardRowsButtonProps extends Omit<BoardRowsProps, "typeGame"> {
  player: TotalPlayers;
}

const BoardRowsButton = ({
  item,
  thrownDice = false,
  turn = 1,
  player = 1,
  handleClick,
}: BoardRowsButtonProps) => {
  const { isSelected, isUsed, temporal, value, isBonusYatzy } =
    item.score[player - 1];

  // Dependiendo del estado, se bloqueará el botón...
  const disabledButton = !(turn === player && thrownDice && !isUsed);

  // Dependiendo del estado se valida el valor que se mostrará en la casilla.
  const valueDisplay =
    (thrownDice && turn === player) || isUsed
      ? isUsed
        ? value
        : temporal
      : "";

  // Para renderizar dinamicamente el title
  const title = item.label + (valueDisplay !== "" ? ` = ${valueDisplay}` : "");

  // La clase que se establece cuando un ítem ha sido seleccionado,
  // o que potencialmente puede ser usado.
  const usedItemClass = isUsed ? "used-score" : turn === player ? "turn" : "";

  // Clase que muestra que la casilla está activada y puede ser seleccioanda
  const activeItemClass =
    turn === player && thrownDice ? (isUsed ? "used" : "active") : "";

  // Muestra que el ítem se ha seleccionado...
  const selectedItemClass = isSelected ? "selected" : "";

  return (
    <button
      title={title}
      disabled={disabledButton}
      className={`board-panel-row-score-button ${usedItemClass} ${activeItemClass} ${selectedItemClass}`}
      onClick={() => handleClick(item, player)}
    >
      {valueDisplay}
      {/* Se muestra que se tiene una bonificación por hacer múltiples Yanzyes */}
      {isBonusYatzy && <span>{YATZY_SCORES.YATZY}</span>}
    </button>
  );
};

const BoardRows = ({
  item,
  thrownDice = false,
  typeGame = ETypeGame.SOLO,
  turn = 1,
  handleClick,
}: BoardRowsProps) => {
  const extProps = { item, thrownDice, turn, handleClick };

  return (
    <div className="board-panel-row-category">
      <div className="board-panel-row-item">
        <BoardItem type={item.type} value={item.value} label={item.label} />
      </div>
      <div className="board-panel-row-score">
        <BoardRowsButton {...extProps} player={1} />
        {typeGame === ETypeGame.SOLO ? (
          <div className="board-panel-row-score-label">{item.label}</div>
        ) : (
          <BoardRowsButton {...extProps} player={2} />
        )}
      </div>
    </div>
  );
};

export default React.memo(BoardRows);
