import dotenv from "dotenv";

const ROOM_SIZE_RANGE_BASE = 5;

/**
 * Sólo leerá las variables de entorno en desarollo...
 * Se deben configurar en el servicio en el que sea desplegado...
 */
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/**
 * Valida el tamaño que puede tener una sala privada,
 * aplicable cuando se está jugando con un amigo...
 */
let ROOM_SIZE_RANGE = process.env.ROOM_SIZE_RANGE || ROOM_SIZE_RANGE_BASE;

/**
 * Valida el rango de la sala...
 * Primero establece si el valor es un número
 * si no lo es, por defecto deja el valor base,
 * si lo es valida el rango, si ni cumple, se deja el valor base...
 */
if (!isNaN(Number(ROOM_SIZE_RANGE))) {
  const roomSizeNumber = +ROOM_SIZE_RANGE;
  ROOM_SIZE_RANGE =
    roomSizeNumber >= ROOM_SIZE_RANGE_BASE - 1 &&
    roomSizeNumber <= ROOM_SIZE_RANGE_BASE + 3
      ? roomSizeNumber
      : ROOM_SIZE_RANGE_BASE;
} else {
  ROOM_SIZE_RANGE = ROOM_SIZE_RANGE_BASE;
}

const CONFIG = {
  ROOM_SIZE_RANGE,
  MONGO_URL: process.env.MONGO_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "",
  GITHUB: {
    KEY: process.env.GITHUB_KEY || "",
    SECRET: process.env.GITHUB_SECRET || "",
  },
  GOOGLE: {
    KEY: process.env.GOOGLE_KEY || "",
    SECRET: process.env.GOOGLE_SECRET || "",
  },
  MICROSOFT: {
    KEY: process.env.MICROSOFT_KEY || "",
    SECRET: process.env.MICROSOFT_SECRET || "",
  },
};

export default CONFIG;
