"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("../config"));
const passport_1 = __importDefault(require("passport"));
const strategies_1 = __importDefault(require("../controllers/passport/strategies"));
const router = (0, express_1.Router)();
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};
const urlRedirect = {
    successRedirect: "/api/successlogin",
    failureRedirect: "/api/successlogin",
};
router.get("/api/successlogin", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/online");
    }
    else {
        res.redirect("/");
    }
});
router.get("/api/me", (req, res) => {
    const authOptions = Object.keys(strategies_1.default)
        .filter((v) => strategies_1.default[v].isEnabled)
        .map((v) => {
        const { socialName, routerURL } = strategies_1.default[v];
        return { socialName, routerURL };
    });
    if (req.isAuthenticated()) {
        const { name, _id, photo } = req.user || {};
        return res.json({
            isAuth: true,
            authOptions,
            roomRange: config_1.default.ROOM_SIZE_RANGE,
            user: { name, id: _id, photo },
        });
    }
    res.json({ isAuth: false, authOptions, roomRange: config_1.default.ROOM_SIZE_RANGE });
});
router.get("/api/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.redirect("/");
});
Object.keys(strategies_1.default).forEach((strategy) => {
    const { callbackURL, routerURL, socialName, scope, isEnabled } = strategies_1.default[strategy];
    if (isEnabled) {
        router.get(routerURL, isLoggedIn, passport_1.default.authenticate(socialName, scope));
        router.get(callbackURL, passport_1.default.authenticate(socialName, urlRedirect));
    }
});
exports.default = router;
