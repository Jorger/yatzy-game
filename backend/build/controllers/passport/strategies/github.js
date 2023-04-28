"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const passport_github2_1 = __importDefault(require("passport-github2"));
const callbackURL = "/api/auth/github/callback";
const isEnabled = !!(config_1.default.GITHUB.KEY && config_1.default.GITHUB.SECRET);
exports.default = {
    isEnabled,
    callbackURL,
    routerURL: "/api/auth/github",
    socialName: "github",
    socialType: 1,
    fileds: {
        email: "emails[0].value",
        name: "username",
        photo: "photos[0].value",
        token: "id",
    },
    scope: { scope: ["user:email"] },
    auth(cb) {
        return new passport_github2_1.default.Strategy({
            clientID: config_1.default.GITHUB.KEY,
            clientSecret: config_1.default.GITHUB.SECRET,
            callbackURL,
        }, (_, _2, profile, done) => {
            cb({ profile, done });
        });
    },
};
