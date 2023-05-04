import { io, Socket } from "socket.io-client";
import { isDev } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useShowMessageRedirect } from ".";
import swal from "sweetalert";
import type { Player, TotalPlayers, TypeRoom } from "../interfaces";

let socket: Socket;

interface IDataSocket {
  initialTurn: TotalPlayers;
  opponent: Partial<Player>;
  room: string;
}
interface INewOpponent {
  IDTurn: string;
  players: Partial<Player>[];
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
  const setRedirect = useShowMessageRedirect();
  const [dataSocket, setDataSocket] = useState<IDataSocket>();

  useEffect(() => {
    const { user } = connectionData;

    // Se obtiene el valor del puerto de conexión, sólo aplicable para desarrollo...
    const SOCKET_PORT = process.env.REACT_APP_API_PORT || 3000;
    // Se establece la URL de conexión...
    const socketURL = isDev() ? `http://localhost:${SOCKET_PORT}` : "/";
    // Se hace la conexión con el socket
    socket = io(socketURL, { withCredentials: true });

    socket.on("connect_error", (_) => {
      // Si existe un error de conexión se redirecciona el usuario...
      setRedirect({
        message: {
          title: "Error connecting to socket",
          icon: "error",
          timer: 5000,
        },
      });
    });

    socket.on("connect", () => {
      /**
       * Emite la data al server para el nuevo usuario,
       * valida si hay errores...
       */
      socket.emit("NEW_USER", connectionData, (error: string) => {
        // Si existe un error, muestra un mensaje y redirecciona el usuario.
        if (!["Authenticated", "Unauthenticated"].includes(error)) {
          setRedirect({
            message: {
              title: error,
              icon: "error",
              timer: 5000,
            },
          });
        } else {
          // Si el error es que el usuario está o no está auténticado.
          // se muestra el mensaje y se hace una recarga de la página
          // para así actualizar la información en el cliente
          const text = {
            Authenticated: "You are already authenticated",
            Unauthenticated: "You are not authenticated",
          };

          swal({
            title: error,
            text: text[error as keyof typeof text],
            icon: "info",
            closeOnClickOutside: false,
            closeOnEsc: false,
            timer: 5000,
          }).then(() => window.location.reload());
        }
      });

      socket.on("NEW_OPPONENT", ({ IDTurn, players, room }: INewOpponent) => {
        // Se define el turno inicial, dependiendo del valor regresado por el socket
        // en este caso se definie a partir del id que llega del socket,
        // comparando con el id del usuario final y así se sabe si es el turno 1 ó 2
        const initialTurn: TotalPlayers = user.id === IDTurn ? 1 : 2;
        // Se extrae el valor del opnente que por defecto es el
        // id diferente al usuario actual
        const opponent = players.filter((v) => v.id !== user.id)?.[0];
        // Guarda la data en el estado, la cuale s enviada al componente que la necesite...
        setDataSocket({ initialTurn, opponent, room });
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
