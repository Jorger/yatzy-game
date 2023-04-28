"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
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
router.get("/api/me", async (_, res) => {
    const user = new user_1.default({
        name: "Jorge",
        email: "test",
        token: "1234",
        socialType: 1,
        socialName: "google",
    });
    await user.save();
    res.json({ isAuth: false, user });
});
router.get("/api/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.redirect("/");
});
exports.default = router;
