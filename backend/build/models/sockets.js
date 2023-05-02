"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../utils/redis");
const helpers_1 = require("../utils/helpers");
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("./user"));
const startSocketServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        socket.on("NEW_USER", async ({ user, typeRoom, room: customRoom = "", isCreatorRoom = false, isGuest = false, }, cb) => {
            if (!isGuest) {
                try {
                    await user_1.default.findById(user.id);
                }
                catch (_) {
                    return cb?.("Invalid user");
                }
            }
            let joinRoom = typeRoom === "FRIEND" && !isCreatorRoom ? customRoom : "";
            let playersMatch = await (0, redis_1.getDataFromRedis)();
            if (Object.keys(playersMatch).length !== 0 && typeRoom === "ONLINE") {
                const rooms = Object.keys(playersMatch);
                for (let i = 0; i < rooms.length; i++) {
                    const room = playersMatch[rooms[i]];
                    const isFull = playersMatch[rooms[i]].isFull;
                    const opponent = room.players[0];
                    const isSameUser = opponent.id === user.id;
                    if (!isSameUser && !isFull && room.type === "ONLINE") {
                        joinRoom = room.room;
                        break;
                    }
                }
            }
            if (joinRoom !== "") {
                if (playersMatch[joinRoom]) {
                    const turn = (0, helpers_1.randomNumber)(1, 2);
                    const opponent = playersMatch[joinRoom].players[0];
                    if (opponent.id === user.id) {
                        return cb?.("You can't play yourself");
                    }
                    const players = [opponent, { ...user, socketID: socket.id }];
                    const dataSocket = {
                        IDTurn: turn === 1 ? opponent.id : user.id,
                        players,
                        room: joinRoom,
                    };
                    playersMatch[joinRoom].isFull = true;
                    playersMatch[joinRoom].players = players;
                    (0, redis_1.setDataRedis)(playersMatch);
                    socket.join(joinRoom);
                    return io.sockets.in(joinRoom).emit("NEW_OPPONENT", dataSocket);
                }
                else {
                    return cb?.("The room no longer exists");
                }
            }
            const room = typeRoom === "ONLINE" ? (0, helpers_1.guid)() : customRoom;
            const newRoom = {
                room,
                isFull: false,
                type: typeRoom,
                timestamp: new Date().getTime() + 1200000,
                players: [{ ...user, socketID: socket.id }],
            };
            playersMatch = { ...playersMatch, [room]: newRoom };
            (0, redis_1.setDataRedis)(playersMatch);
            socket.join(room);
        });
        socket.on("disconnect", async () => {
            const playersMatch = await (0, redis_1.getDataFromRedis)();
            const playersMatchKey = Object.keys(playersMatch);
            console.log("USUARIO SE DESCONECTA");
            console.log({ socket: socket.id, playersMatch, playersMatchKey });
            if (playersMatchKey.length !== 0) {
                for (let i = 0; i < playersMatchKey.length; i++) {
                    const room = playersMatch[playersMatchKey[i]];
                    const { players, room: roomName, isFull } = room;
                    const socketExists = players.find((v) => v.socketID === socket.id);
                    if (socketExists) {
                        delete playersMatch[roomName];
                        (0, redis_1.setDataRedis)(playersMatch);
                        if (isFull) {
                            io.sockets.in(roomName).emit("OPPONENT_LEAVE");
                        }
                        break;
                    }
                }
            }
        });
    });
    console.log("Sockets");
};
exports.default = startSocketServer;
