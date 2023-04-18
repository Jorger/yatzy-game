import "./styles.css";
import { ScoreHeader } from "..";
import React from "react";
import type {
  HeaderCountdown,
  Player,
  TotalPlayers,
} from "../../../../../../interfaces";

interface PlayersHeaderProps {
  countdown?: HeaderCountdown;
  players: Player[];
  turn: TotalPlayers;
}

const PlayersHeader = ({
  countdown,
  players,
  turn = 1,
}: PlayersHeaderProps) => (
  <div className="header-players">
    {players.map((player, index) => (
      <ScoreHeader
        countdown={countdown}
        isSelected={turn === index + 1}
        key={player.id}
        player={player}
        turn={turn}
      />
    ))}
  </div>
);

export default React.memo(PlayersHeader);
