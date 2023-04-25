import "./styles.css";
import { Options, Links } from "./components";
import { PageWrapper } from "../wrappers";
import Logo from "../logo";
import React from "react";

const LobbyGame = () => {
  return (
    <PageWrapper showBack={false}>
      <div className="lobby-game">
        <Logo />
        <Links />
        <Options />
      </div>
    </PageWrapper>
  );
};

export default React.memo(LobbyGame);
