import "./styles.css";
import { Options, Links } from "./components";
import { PageWrapper } from "../wrappers";
import { useSounds } from "../../hooks";
import CircularButton from "../circularButton";
import Logo from "../logo";
import React from "react";

const LobbyGame = () => {
  const { withSound, toggleSound } = useSounds();

  return (
    <PageWrapper showBack={false}>
      <div className="lobby-game">
        <CircularButton
          type={withSound ? "sound-on" : "sound-off"}
          onClick={toggleSound}
        />
        <Logo />
        <Links />
        <Options />
      </div>
    </PageWrapper>
  );
};

export default React.memo(LobbyGame);
