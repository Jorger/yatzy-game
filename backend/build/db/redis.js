"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const config_1 = __importDefault(require("../config"));
const connect_redis_1 = __importDefault(require("connect-redis"));
exports.redisClient = (0, redis_1.createClient)({ url: config_1.default.REDIS_URL });
exports.redisClient.connect().catch(console.error);
const redisStore = new connect_redis_1.default({ client: exports.redisClient });
exports.default = redisStore;
