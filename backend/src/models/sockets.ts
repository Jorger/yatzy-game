import { getDataFromRedis, setDataRedis } from "../utils/redis";
import { guid, randomNumber } from "../utils/helpers";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import type { IDataRoom, IRoom, IUserRoom, TypeRoom } from "../interfaces";
import User from "./user";

interface INewUser {
  typeRoom: TypeRoom;
  room?: string;
  user: IUserRoom;
  isCreatorRoom?: boolean;
  isGuest?: boolean;
}

const startSocketServer = (server: Server) => {
  const io = new SocketServer(server);

  io.on("connection", (socket) => {
    socket.on(
      "NEW_USER",
      async (
        {
          user,
          typeRoom,
          room: customRoom = "",
          isCreatorRoom = false,
          isGuest = false,
        }: INewUser,
        cb?: (error: string) => void
      ) => {
        // console.log("data es: ", user, typeRoom);

        // Se valida que exista el usaurio en la base de datos...
        // No se valida si es un jugador invitado...
        if (!isGuest) {
          try {
            await User.findById(user.id);
          } catch (_) {
            return cb?.("Invalid user");
          }
        }

        // Para la sala a la cual se uniará el oponente
        // Si es de tipo friend y es el usuario que se uno, joinRoom tendrá el valor de la sala..
        // si no es así este es el valor que se asiganrá depsupés...
        let joinRoom =
          typeRoom === "FRIEND" && !isCreatorRoom ? customRoom : "";

        // Obtener los usuarios que estén actualmente esperando...
        // Se deja let por que puede que cambie
        let playersMatch: IRoom = await getDataFromRedis();

        // console.log("playersMatch", playersMatch);

        /**
         * Ingresa si hay datos en redis y además que el tipo de jugabilidad sea ONLINE
         */
        if (Object.keys(playersMatch).length !== 0 && typeRoom === "ONLINE") {
          // Si hay jugadores pendiente en las salas,
          // se deben iterar y buscar que no esté el mismo usuario...
          // Se converiete las salas en un array para iterarlas...
          const rooms = Object.keys(playersMatch);

          // Se iteran la salas...
          for (let i = 0; i < rooms.length; i++) {
            // Se extrae el valor de cada sala...
            const room = playersMatch[rooms[i]];
            // Valida si la sala ya está llena o usada...
            const isFull = playersMatch[rooms[i]].isFull;
            // Obtener el valor del oponente
            const opponent = room.players[0];

            // Se valida si el usuario que está en la sala es el mismo
            // que se está conectado...
            const isSameUser = opponent.id === user.id;

            // No es el mismo usuario y además la sala no está llena,
            // así que se ha encontrando una sala con un oponente disponible...
            // Además la sala debe ser de tipo ONLINE, de esta forma excluyendo la sala de amigos...
            if (!isSameUser && !isFull && room.type === "ONLINE") {
              // Se establece la sala que se puede usar,
              joinRoom = room.room;
              break;
            }
          }
        }

        if (joinRoom !== "") {
          if (playersMatch[joinRoom]) {
            // Se indica el turno inicial del juego...
            const turn = randomNumber(1, 2);

            // Se extrae la información del oponente...
            const opponent = playersMatch[joinRoom].players[0];

            // Se valida que el usuario no sea el mismo...
            if (opponent.id === user.id) {
              return cb?.("You can't play yourself");
            }

            /**
             * Se consolida los jugadores de la sala
             * estos son enviados al cliente y son guardados en redis...
             */
            const players = [opponent, { ...user, socketID: socket.id }];

            // Se crea la data que se devolverá al cliente...
            const dataSocket = {
              IDTurn: turn === 1 ? opponent.id : user.id,
              players,
              room: joinRoom,
            };

            // Se establece que la sala ya está llena...
            playersMatch[joinRoom].isFull = true;
            // Se actualiza el listado de jugadores...
            playersMatch[joinRoom].players = players;

            // Se guarda la data en redis...
            setDataRedis(playersMatch);

            // Se une el usuario al socket...
            socket.join(joinRoom);

            // Se emite la información al usuario...
            // se pone return oara terminar la ejecución de la función...
            return io.sockets.in(joinRoom).emit("NEW_OPPONENT", dataSocket);
          } else {
            return cb?.("The room no longer exists");
          }
        }

        // Se crea el id para la nueva sala...
        const room = typeRoom === "ONLINE" ? guid() : customRoom;

        // Se crean los datos que se guardarán en redis...
        const newRoom: IDataRoom = {
          room,
          isFull: false,
          type: typeRoom,
          timestamp: new Date().getTime() + 1200000, // 20 minutos
          players: [{ ...user, socketID: socket.id }],
        };

        /**
         * Se actualiza la información...
         * se deja la data que se tenía antes y se une con la información de la nueva sala...
         */
        playersMatch = { ...playersMatch, [room]: newRoom };

        // Se guarda la data en redis...
        setDataRedis(playersMatch);

        // Se une el usuario a la sala...
        socket.join(room);
      }
    );

    /**
     * Socket que escucha los diferentes eventos del BOARD...
     */
    socket.on("ACTIONS", async (data) => {
      // Sólo se permiten dos tipo de acciones...
      if (["ROLL", "PLAY"].includes(data.type)) {
        // Se valida si se debe eliminar la sala,
        // sólo es aplicable cuando isGameOver es true
        if (data.type === "PLAY" && data.isGameOver) {
          const playersMatch = await getDataFromRedis();

          if (playersMatch[data.room]) {
            // Elimina la sala...
            delete playersMatch[data.room];
            // Actualiza la información en redis...
            setDataRedis(playersMatch);
          }
        }
        // Se emite la información al otro cliente...
        // Sólo emite al otro cliente no al que hizo el envío...
        socket.broadcast.to(data.room).emit(data.type, data);
      }
    });

    socket.on("disconnect", async () => {
      // Buscar si el socket id que se ha desconectado existe en redis...
      const playersMatch = await getDataFromRedis();
      const playersMatchKey = Object.keys(playersMatch);

      // Hay valores en redis...
      if (playersMatchKey.length !== 0) {
        // Buscar si el socket id existe...
        for (let i = 0; i < playersMatchKey.length; i++) {
          const room = playersMatch[playersMatchKey[i]];
          const { players, room: roomName, isFull } = room;

          /**
           * Se valida si la sala asociada con el socket que se ha desconectado,
           * está relacionado con la data guardada en redis...
           */
          const socketExists = players.find((v) => v.socketID === socket.id);

          // Se encontró el socket...
          if (socketExists) {
            // Se debe eliminar la data de redis...
            delete playersMatch[roomName];
            // Se actualiza la información en redis...
            setDataRedis(playersMatch);

            // Era una sala que estaba completa...
            if (isFull) {
              // Se debe emitir al otro usuario que el usuario se desconectó...
              io.sockets.in(roomName).emit("OPPONENT_LEAVE");
            }
            break;
          }
        }
      }
    });
  });
};

export default startSocketServer;