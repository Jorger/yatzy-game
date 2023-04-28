"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.hidePoweredBy());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((error, _, res, _2) => {
    res.status(500).json({ message: error.message });
});
app.get("*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname + "/public/index.html"));
});
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
