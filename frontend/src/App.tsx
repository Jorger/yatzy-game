import { AppWrapper } from "./components/wrappers";
import Game from "./components/game";
import React from "react";

// typeGame="ONLINE" initialTurn={2}
const App = () => {
  return (
    <AppWrapper>
      <Game />
    </AppWrapper>
  );
};

export default React.memo(App);
