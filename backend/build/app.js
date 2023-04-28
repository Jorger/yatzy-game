"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
const compression_1 = __importDefault(require("compression"));
const config_1 = __importDefault(require("./config"));
const mongo_1 = __importDefault(require("./db/mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const redis_1 = __importDefault(require("./db/redis"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.hidePoweredBy());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
const isProduction = process.env.NODE_ENV === "production";
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redis_1.default,
    cookie: {
        secure: isProduction,
        httpOnly: isProduction,
        maxAge: new Date(Date.now() + 5184000000).getTime(),
    },
}));
app.use(routes_1.default);
app.use((error, _, res, _2) => {
    res.status(500).json({ message: error.message });
});
app.get("*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname + "/public/index.html"));
});
(0, mongo_1.default)((error) => {
    if (!error) {
        console.log("MongoDB connected successfully!");
        return server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    console.error("MongoDB connection error:", error);
});
