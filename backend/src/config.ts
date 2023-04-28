import dotenv from "dotenv";

// const ROOM_SIZE_RANGE_BASE = 5;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const CONFIG = {
  MONGO_URL: process.env.MONGO_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "",
  GITHUB: {
    KEY: process.env.GITHUB_KEY || "",
    SECRET: process.env.GITHUB_SECRET || "",
  },
  GOOGLE: {
    KEY: process.env.GOOGLE_KEY || "",
    SECRET: process.env.GOOGLE_SECRET || "",
  },
  MICROSOFT: {
    KEY: process.env.MICROSOFT_KEY || "",
    SECRET: process.env.MICROSOFT_SECRET || "",
  },
};

export default CONFIG;
