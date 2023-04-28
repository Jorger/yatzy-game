import apiRoute from "./routes";
import compression from "compression";
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import helmet from "helmet";
import http from "http";
import path from "path";
// import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Para servir los archivos estáticos del juego
app.use(express.static(path.join(__dirname, "/public")));

app.use(helmet());
app.use(helmet.hidePoweredBy());

// Para compresión de archivo gzip...
app.use(compression());
app.use(express.json());

/**
 * Para agregar el router para el api
 */
app.use(apiRoute);

/**
 * Captura los errores que puedan exitir...
 */
app.use((error: Error, _: Request, res: Response, _2: NextFunction) => {
  res.status(500).json({ message: error.message });
});

// app.get<RequestHandler>("/api/test", (_, res) => {
//   res.json({ test: true, moreInfo: "Hola Mundo" });
// });

// Maneja los demás requests que no se ajusten a los rutas definidas
app.get<RequestHandler>("*", (_, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
