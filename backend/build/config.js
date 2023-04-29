"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ROOM_SIZE_RANGE_BASE = 5;
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
let ROOM_SIZE_RANGE = process.env.ROOM_SIZE_RANGE || ROOM_SIZE_RANGE_BASE;
if (!isNaN(Number(ROOM_SIZE_RANGE))) {
    const roomSizeNumber = +ROOM_SIZE_RANGE;
    ROOM_SIZE_RANGE =
        roomSizeNumber >= ROOM_SIZE_RANGE_BASE - 1 &&
            roomSizeNumber <= ROOM_SIZE_RANGE_BASE + 3
            ? roomSizeNumber
            : ROOM_SIZE_RANGE_BASE;
}
else {
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
exports.default = CONFIG;
