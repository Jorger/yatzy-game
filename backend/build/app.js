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
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./controllers/passport"));
const path_1 = __importDefault(require("path"));
const redis_1 = __importDefault(require("./db/redis"));
const express_session_1 = __importDefault(require("express-session"));
const sockets_1 = __importDefault(require("./models/sockets"));
(0, passport_2.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.hidePoweredBy());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
const isProduction = process.env.NODE_ENV === "production";
console.log({ isProduction });
app.use((0, cookie_parser_1.default)());
const sessionMiddleware = (0, express_session_1.default)({
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redis_1.default,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: new Date(Date.now() + 5184000000).getTime(),
    },
});
app.use(sessionMiddleware);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
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
        (0, sockets_1.default)(server, sessionMiddleware);
        return server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    console.error("MongoDB connection error:", error);
});
