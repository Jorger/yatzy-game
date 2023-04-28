import apiRoute from "./routes";
import compression from "compression";
import CONFIG from "./config";
import connectDB from "./db/mongo";
import cookieParser from "cookie-parser";
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import helmet from "helmet";
import http from "http";
import passport from "passport";
import passportController from "./controllers/passport";
import path from "path";
import redisStore from "./db/redis";
import session from "express-session";

passportController();

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

// Variable que establece si se está ejecuntado en el ambiente de production
// Al estar en true habilitará las propiedades de secure y httpOnly, indicando
// que sólo se transfiera cookies por una navegación segura (https)
const isProduction = process.env.NODE_ENV === "production";

/**
 * Para la creación de la sesión...
 */
app.use(cookieParser());
app.use(
  session({
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
      secure: isProduction,
      httpOnly: isProduction,
      maxAge: new Date(Date.now() + 5184000000).getTime(),
    },
  })
);

/**
 Se relaciona passport con express...
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Se agrega el usaurio al request...
 */
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

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

// Maneja los demás requests que no se ajusten a los rutas definidas
app.get<RequestHandler>("*", (_, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

connectDB((error) => {
  if (!error) {
    console.log("MongoDB connected successfully!");

    return server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }

  console.error("MongoDB connection error:", error);
});
