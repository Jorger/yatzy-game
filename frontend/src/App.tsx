import { AppWrapper } from "./components/wrappers";
import Game from "./components/game";
import React from "react";

const App = () => {
  return (
    <AppWrapper>
      <div>
        <Game />
      </div>
    </AppWrapper>
  );
};

export default React.memo(App);
