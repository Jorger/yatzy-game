"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = exports.guid = exports.isValidJson = void 0;
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
