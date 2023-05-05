import { ETypeGame } from "../../utils/constants";
import { guid, randomNumber } from "../../utils/helpers";
import { PageWrapper } from "../wrappers";
import { useSocket } from "../../hooks";
import Loading from "../loading";
import React, { Suspense, lazy, useState } from "react";
import type { Player } from "../../interfaces";

const Game = lazy(() => import("../game"));

const PlayAsGuest = () => {
  /**
   * Guarda la información de un jugador temporal
   * No se establece el set, por que no es necesario
   * en este caso se desea que se preserve el valor cuando el
   * componente cambia...
   */
  const [authUser] = useState<Partial<Player>>({
    name: `Player ${randomNumber(10000, 99999)}`,
    id: `id_${guid()}`,
  });

  const { socket, dataSocket } = useSocket({
    user: authUser,
    typeRoom: ETypeGame.ONLINE,
    isGuest: true,
  });

  if (!dataSocket) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
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

export default React.memo(PlayAsGuest);
