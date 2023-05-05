"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../utils/redis");
const helpers_1 = require("../utils/helpers");
const socket_io_1 = require("socket.io");
const passport_1 = __importDefault(require("passport"));
const startSocketServer = (server, sessionMiddleware) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            credentials: true,
        },
    });
    const wrapSocketRequest = (middleware) => {
        return (socket, next) => {
            return middleware(socket.request, {}, next);
        };
    };
    io.use(wrapSocketRequest(sessionMiddleware));
    io.use(wrapSocketRequest(passport_1.default.initialize()));
    io.use(wrapSocketRequest(passport_1.default.session()));
    io.on("connection", (socket) => {
        socket.on("NEW_USER", async ({ user, typeRoom, room: customRoom = "", isCreatorRoom = false, isGuest = false, }, cb) => {
            const request = socket.request;
            if (typeRoom === "FRIEND" && !(0, helpers_1.isAValidRoom)(customRoom)) {
                return cb?.("Invalid room");
            }
            if (!isGuest) {
                if (request.isAuthenticated()) {
                    const authUserID = request?.user._id?.toString() || "";
                    if (authUserID !== user.id) {
                        return cb?.("Invalid user");
                    }
                }
                else {
                    return cb?.("Unauthenticated");
                }
            }
            else if (request.isAuthenticated()) {
                return cb?.("Authenticated");
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
        socket.on("ACTIONS", async (data) => {
            if (["ROLL", "PLAY"].includes(data.type)) {
                if (data.type === "PLAY" && data.isGameOver) {
                    const playersMatch = await (0, redis_1.getDataFromRedis)();
                    if (playersMatch[data.room]) {
                        delete playersMatch[data.room];
                        (0, redis_1.setDataRedis)(playersMatch);
                    }
                }
                socket.broadcast.to(data.room).emit(data.type, data);
            }
        });
        socket.on("disconnect", async () => {
            const playersMatch = await (0, redis_1.getDataFromRedis)();
            const playersMatchKey = Object.keys(playersMatch);
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
};
exports.default = startSocketServer;
