"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const strategies_1 = __importDefault(require("../controllers/passport/strategies"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
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
    if (req.isAuthenticated()) {
        const { name, _id, photo } = req.user || {};
        return res.json({
            isAuth: true,
            user: { name, id: _id, photo },
        });
    }
    res.json({ isAuth: false });
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
        router.get(routerURL, passport_1.default.authenticate(socialName, scope));
        router.get(callbackURL, passport_1.default.authenticate(socialName, urlRedirect));
    }
});
exports.default = router;
