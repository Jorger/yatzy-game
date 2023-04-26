import "./styles.css";
import { Options, Links } from "./components";
import { PageWrapper } from "../wrappers";
import CircularButton from "../circularButton";
import Logo from "../logo";
import React from "react";

const LobbyGame = () => {
  return (
    <PageWrapper showBack={false}>
      <div className="lobby-game">
        <CircularButton
          type="sound-off"
          onClick={() => {
            console.log("Sonidos");
          }}
        />
        <Logo />
        <Links />
        <Options />
      </div>
    </PageWrapper>
  );
};

export default React.memo(LobbyGame);
