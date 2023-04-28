"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = __importDefault(require("./github"));
const google_1 = __importDefault(require("./google"));
const microsoft_1 = __importDefault(require("./microsoft"));
const PASSPORT_STRATEGIES = {
    GITHUB: github_1.default,
    GOOGLE: google_1.default,
    MICROSOFT: microsoft_1.default,
};
exports.default = PASSPORT_STRATEGIES;
