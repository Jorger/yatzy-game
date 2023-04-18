import { AppWrapper } from "./components/wrappers";
import Game from "./components/game";
import React from "react";

const App = () => {
  return (
    <AppWrapper>
      <Game typeGame="FRIEND" initialTurn={2} />
    </AppWrapper>
  );
};

export default React.memo(App);
