"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const CONFIG = {
    MONGO_URL: process.env.MONGO_URL || "",
    REDIS_URL: process.env.REDIS_URL || "",
    SESSION_SECRET: process.env.SESSION_SECRET || "",
};
exports.default = CONFIG;
