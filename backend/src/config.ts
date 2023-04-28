import dotenv from "dotenv";

// const ROOM_SIZE_RANGE_BASE = 5;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const CONFIG = {
  MONGO_URL: process.env.MONGO_URL || "",
};

export default CONFIG;
