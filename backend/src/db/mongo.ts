import CONFIG from "../config";
import mongoose from "mongoose";

const connect = (callback: (error?: any) => void) => {
  mongoose
    .connect(CONFIG.MONGO_URL)
    .then(() => callback())
    .catch((err) => callback(err));
};

export default connect;
