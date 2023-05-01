import { io, Socket } from "socket.io-client";
import { isDev } from "../utils/helpers";
import { useEffect, useState } from "react";
import type { Player, TotalPlayers, TypeRoom } from "../interfaces";

let socket: Socket;

interface IDataSocket {
  initialTurn: TotalPlayers;
  opponent: Partial<Player>;
  room: string;
}

interface IUseSocket {
  typeRoom: TypeRoom;
  room?: string;
  user: Partial<Player>;
  isCreatorRoom?: boolean;
  isGuest?: boolean;
}

const useSocket = (connectionData: IUseSocket) => {
  const [dataSocket, setDataSocket] = useState<IDataSocket>();

  useEffect(() => {
    const { user } = connectionData;

    // Se obtiene el valor del puerto de conexión, sólo aplicable para desarrollo...
    const SOCKET_PORT = process.env.REACT_APP_API_PORT || 3000;
    // Se hace la conexión con el socket
    socket = isDev() ? io(`http://localhost:${SOCKET_PORT}`) : io();

    socket.on("connect_error", (error) => {
      console.log("Error: ", error);
    });

    socket.on("connect", () => {
      /**
       * Emite la data al server para el nuevo usuario,
       * valida si hay errores...
       */
      socket.emit("NEW_USER", connectionData, (error: string) => {
        console.log("ERROR NEW_USER", error);
      });
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { socket, dataSocket };
};

export default useSocket;
