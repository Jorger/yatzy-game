"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDataRedis = exports.getDataFromRedis = void 0;
const helpers_1 = require("./helpers");
const redis_1 = require("../db/redis");
const KEY_MATCH_ROOMS = "PLAYERS_MATCH";
const cleanRooms = (rooms) => {
    const roomsKey = Object.keys(rooms);
    const currentTime = new Date().getTime();
    for (let i = 0; i < roomsKey.length; i++) {
        if (rooms[roomsKey[i]].timestamp < currentTime) {
            delete rooms[roomsKey[i]];
        }
    }
    return rooms;
};
const getSerilizedDataRedis = (data = "") => data && (0, helpers_1.isValidJson)(data) ? cleanRooms(JSON.parse(data)) : {};
const getDataFromRedis = async () => {
    const playersRedis = await redis_1.redisClient.get(KEY_MATCH_ROOMS);
    const playersMatch = getSerilizedDataRedis(playersRedis || "");
    return playersMatch;
};
exports.getDataFromRedis = getDataFromRedis;
const setDataRedis = (data) => {
    redis_1.redisClient.set(KEY_MATCH_ROOMS, JSON.stringify(data));
};
exports.setDataRedis = setDataRedis;
