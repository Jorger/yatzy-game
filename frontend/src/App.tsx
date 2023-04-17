import { AppWrapper } from "./components/wrappers";
import Game from "./components/game";
import React from "react";

const App = () => {
  return (
    <AppWrapper>
      <Game />
    </AppWrapper>
  );
};

export default React.memo(App);
