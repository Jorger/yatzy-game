import { isValidJson } from "./helpers";
import { redisClient } from "../db/redis";
import type { IRoom } from "../interfaces";

const KEY_MATCH_ROOMS = "PLAYERS_MATCH";

/**
 * Función que elimina aquellas salas cuyo tiempo de vida haya pasado...
 * @param rooms
 * @returns
 */
const cleanRooms = (rooms: IRoom) => {
  const roomsKey = Object.keys(rooms);
  // Se establece la fecha actual para saber si una sala está o no disponible
  const currentTime = new Date().getTime();

  for (let i = 0; i < roomsKey.length; i++) {
    if (rooms[roomsKey[i]].timestamp < currentTime) {
      delete rooms[roomsKey[i]];
    }
  }

  return rooms;
};

/**
 * Serializa la información guardada en redis...
 * @param data
 * @returns
 */
const getSerilizedDataRedis = (data: string = "") =>
  data && isValidJson(data) ? cleanRooms(JSON.parse(data)) : {};

/**
 * Obtiene la información que está guardada en redis
 * Además la serializa y elimina las salas que ya no estén en uso
 * @returns
 */
export const getDataFromRedis = async () => {
  const playersRedis = await redisClient.get(KEY_MATCH_ROOMS);

  // Se parsea la data que está en redis
  // Se válida que existan datos y que sea un JSON válido...
  // Además se limpian aquella salas que el tiempo haya pasado...
  const playersMatch: IRoom = getSerilizedDataRedis(playersRedis || "");

  return playersMatch;
};

/**
 * Guarda la data en redis
 * además convierte el valor en string...
 * @param data
 */
export const setDataRedis = (data: IRoom) => {
  redisClient.set(KEY_MATCH_ROOMS, JSON.stringify(data));
};
