import { handleBack } from "./helpers";
import { HeaderWrapper, PlayersHeader } from "./components";
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
  return (
    <HeaderWrapper>
      <CircularButton
        type="back"
        onClick={() => {
          // TODO: implementar router...
          handleBack((action) => console.log(action));
        }}
      />
      <PlayersHeader {...props} />
      <CircularButton type="sound-on" onClick={() => console.log("sound-on")} />
    </HeaderWrapper>
  );
};

export default React.memo(Header);
