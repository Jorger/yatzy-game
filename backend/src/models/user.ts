import { model, Schema } from "mongoose";
import type { IUser } from "../interfaces";

const userSchema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
