import { ConnectedOpponent, OnlineOptions } from "./components";
import React, { useState } from "react";
import type { IAuth, TypeRoom } from "../../interfaces";

interface GameOnlineProps {
  state: IAuth;
}

const GameOnline = ({ state }: GameOnlineProps) => {
  const [typeRoom, setTypeRoom] = useState<TypeRoom>();

  if (!typeRoom) {
    return (
      <OnlineOptions
        state={state}
        handleSelectType={(type) => setTypeRoom(type)}
      />
    );
  }

  const extPros = { state, typeRoom };

  return <ConnectedOpponent {...extPros} />;
};

export default React.memo(GameOnline);
