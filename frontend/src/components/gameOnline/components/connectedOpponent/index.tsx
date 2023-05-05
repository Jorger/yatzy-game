import { ETypeGame } from "../../../../utils/constants";
import { useSocket } from "../../../../hooks";
import { WaitOpponent } from "..";
import Loading from "../../../loading";
import React, { Suspense, lazy } from "react";
import type { IAuth, TypeRoom } from "../../../../interfaces";

const Game = lazy(() => import("../../../game"));

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
    room,
    isCreatorRoom,
  });

  if (!dataSocket) {
    return <WaitOpponent state={state} room={room} />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Game
        {...dataSocket}
        socket={socket}
        authUser={authUser}
        typeGame={ETypeGame.ONLINE}
      />
    </Suspense>
  );
};

export default React.memo(ConnectedOpponent);
