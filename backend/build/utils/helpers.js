"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAValidRoom = exports.randomNumber = exports.guid = exports.isValidJson = void 0;
const config_1 = __importDefault(require("../config"));
const isValidJson = (json) => {
    try {
        JSON.parse(json);
        return true;
    }
    catch (_) {
        return false;
    }
};
exports.isValidJson = isValidJson;
const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4();
};
exports.guid = guid;
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.randomNumber = randomNumber;
const isAValidRoom = (value) => {
    const numRegex = /^[1-9]\d*$/;
    return numRegex.test(value) && value.length === config_1.default.ROOM_SIZE_RANGE;
};
exports.isAValidRoom = isAValidRoom;
