import { ConnectedOpponent, OnlineOptions, PlayWithFriend } from "./components";
import React, { useEffect, useState } from "react";
import type { IAuth, TypeRoom } from "../../interfaces";

interface GameOnlineProps {
  state: IAuth;
  roomURL: string;
}

const GameOnline = ({ state, roomURL = "" }: GameOnlineProps) => {
  const [typeRoom, setTypeRoom] = useState<TypeRoom>();
  const [dataRoom, setDataRoom] = useState({
    room: "",
    isCreatorRoom: false,
  });

  /**
   * Efecto que escucha si existe un valor de la sala en la url
   */
  useEffect(() => {
    if (roomURL !== "") {
      setDataRoom({ room: roomURL, isCreatorRoom: false });
      setTypeRoom("FRIEND");
    }
  }, [roomURL]);

  /**
   * Renderiza el componente de las opciones online,
   * se muestra cuando no se ha elegido el tipo de sala...
   */
  if (!typeRoom) {
    return (
      <OnlineOptions
        state={state}
        handleSelectType={(type) => setTypeRoom(type)}
      />
    );
  }

  if (typeRoom === "FRIEND" && !dataRoom.room) {
    return (
      <PlayWithFriend
        state={state}
        handleNewRoom={(newDataRoom) => setDataRoom(newDataRoom)}
      />
    );
  }

  const extPros = { state, typeRoom, ...dataRoom };

  return <ConnectedOpponent {...extPros} />;
};

export default React.memo(GameOnline);
