"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
    },
    token: {
        type: String,
        required: true,
    },
    socialType: {
        required: true,
        type: Number,
    },
    socialName: {
        required: true,
        type: String,
    },
    photo: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
