import { Profile } from "passport";
import CONFIG from "../../../config";
import GoogleStrategy from "passport-google-oauth2";
import type { CallbackAuth, DoneFunction } from "../../../interfaces";

// Se deja por fuera para poderlo reusar en dos partes...
const callbackURL = "/api/auth/google/callback";
const isEnabled = !!(CONFIG.GOOGLE.KEY && CONFIG.GOOGLE.SECRET);

export default {
  isEnabled,
  callbackURL,
  routerURL: "/api/auth/google",
  socialName: "google",
  socialType: 3,
  fileds: {
    name: "displayName",
    photo: "photos[0].value",
    token: "id",
    email: "email",
  },
  scope: { scope: ["profile", "email"] },
  auth(cb: CallbackAuth) {
    return new GoogleStrategy.Strategy(
      {
        clientID: CONFIG.GOOGLE.KEY,
        clientSecret: CONFIG.GOOGLE.SECRET,
        callbackURL,
      },
      (_: string, _2: string, profile: Profile, done: DoneFunction) => {
        cb({ profile, done });
      }
    );
  },
};
