"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
router.get("/api/me", (_, res) => {
    res.json({ isAuth: false });
});
router.get("/api/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.redirect("/");
});
exports.default = router;
