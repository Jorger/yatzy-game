import { useSocket } from "../../../../hooks";
import { WaitOpponent } from "..";
import React from "react";
import type { IAuth, TypeRoom } from "../../../../interfaces";

interface ConnectedOpponentProps {
  state: IAuth;
  typeRoom: TypeRoom;
  isCreatorRoom?: boolean;
  room?: string;
}

const ConnectedOpponent = ({
  state,
  typeRoom,
  room = "",
  isCreatorRoom = false,
}: ConnectedOpponentProps) => {
  const authUser = state?.isAuth ? state.user || {} : {};
  const { socket, dataSocket } = useSocket({
    user: authUser,
    typeRoom,
  });

  // console.log("authUser", authUser);

  if (!dataSocket) {
    return <WaitOpponent state={state} />;
  }

  return <div>Mostrar Juego</div>;
};

export default React.memo(ConnectedOpponent);
