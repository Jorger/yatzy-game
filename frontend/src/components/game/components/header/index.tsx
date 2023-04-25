import { handleBack } from "./helpers";
import { HeaderWrapper, PlayersHeader } from "./components";
import { useNavigate } from "react-router-dom";
import CircularButton from "../../../circularButton";
import React from "react";
import type {
  HeaderCountdown,
  Player,
  TotalPlayers,
} from "../../../../interfaces";

interface HeaderProps {
  countdown?: HeaderCountdown;
  players: Player[];
  turn: TotalPlayers;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <CircularButton
        type="back"
        onClick={() => handleBack((action) => action && navigate("/"))}
      />
      <PlayersHeader {...props} />
      <CircularButton type="sound-on" onClick={() => console.log("sound-on")} />
    </HeaderWrapper>
  );
};

export default React.memo(Header);
