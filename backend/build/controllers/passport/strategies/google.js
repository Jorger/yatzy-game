"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const callbackURL = "/api/auth/google/callback";
const isEnabled = !!(config_1.default.GOOGLE.KEY && config_1.default.GOOGLE.SECRET);
exports.default = {
    isEnabled,
    callbackURL,
    routerURL: "/api/auth/google",
    socialName: "google",
    socialType: 3,
    fileds: {
        name: "displayName",
        photo: "photos[0].value",
        token: "id",
        email: "email",
    },
    scope: { scope: ["profile", "email"] },
    auth(cb) {
        return new passport_google_oauth2_1.default.Strategy({
            clientID: config_1.default.GOOGLE.KEY,
            clientSecret: config_1.default.GOOGLE.SECRET,
            callbackURL,
        }, (_, _2, profile, done) => {
            cb({ profile, done });
        });
    },
};
