import { OnlineOptions } from "./components";
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

  return <div>GameOnline</div>;
};

export default React.memo(GameOnline);
