"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const passport_microsoft_1 = __importDefault(require("passport-microsoft"));
const callbackURL = "/api/auth/microsoft/callback";
const isEnabled = !!(config_1.default.GOOGLE.KEY && config_1.default.GOOGLE.SECRET);
exports.default = {
    isEnabled,
    callbackURL,
    routerURL: "/api/auth/microsoft",
    socialName: "microsoft",
    socialType: 2,
    fileds: {
        name: "displayName",
        token: "id",
        email: "emails[0].value",
    },
    scope: {},
    auth(cb) {
        return new passport_microsoft_1.default.Strategy({
            clientID: config_1.default.MICROSOFT.KEY,
            clientSecret: config_1.default.MICROSOFT.SECRET,
            callbackURL,
            scope: ["user.read"],
            authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        }, (_, _2, profile, done) => {
            cb({ profile, done });
        });
    },
};
