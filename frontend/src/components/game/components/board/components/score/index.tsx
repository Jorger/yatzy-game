import "./styles.css";
import {
  BONUS_VALUE,
  LABELS_GAME,
  MIN_SCORE_BONUS,
} from "../../../../../../utils/constants";
import Icon from "../../../../../icon";
import React from "react";
import type { Player } from "../../../../../../interfaces";
import { ScoreCounter } from "../../..";

const BoardScoreBonus = () => (
  <div className="board-panel-score-bonus">
    <div>{LABELS_GAME.BONUS}</div>
    <div>+{BONUS_VALUE}</div>
  </div>
);

const BoardScoreItem = ({ value = 0 }: { value: number }) => (
  <div className="board-panel-score-item">
    <ScoreCounter score={value} className="board-panel-score-item-score" />
    <div className="board-panel-score-item-bonus">/{MIN_SCORE_BONUS}</div>
  </div>
);

const BoardBonusEarned = () => (
  <div className="board-panel-score-bonus-earned">
    <span>+{BONUS_VALUE}</span>
    <Icon type="check" fill="#fdb823" />
  </div>
);

const BoardScore = ({ players }: { players: Player[] }) => (
  <div className="board-panel-score">
    <BoardScoreBonus />
    <div className="board-panel-score-items">
      {players.map(({ id, isBonusEarned, scoreBoard }) =>
        isBonusEarned ? (
          <BoardBonusEarned key={id} />
        ) : (
          <BoardScoreItem value={scoreBoard.UPPER_SECTION ?? 0} key={id} />
        )
      )}
    </div>
  </div>
);

export default React.memo(BoardScore);
