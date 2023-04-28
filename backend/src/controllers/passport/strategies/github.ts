import { Profile } from "passport";
import CONFIG from "../../../config";
import GitHubStrategy from "passport-github2";
import type { CallbackAuth, DoneFunction } from "../../../interfaces";

// Se deja por fuera para poderlo reusar en dos partes...
const callbackURL = "/api/auth/github/callback";
const isEnabled = !!(CONFIG.GITHUB.KEY && CONFIG.GITHUB.SECRET);

/**
 * Objeto de configuración para la estrategía de github
 */
export default {
  isEnabled,
  callbackURL,
  routerURL: "/api/auth/github",
  socialName: "github",
  socialType: 1,
  fileds: {
    email: "emails[0].value",
    name: "username",
    photo: "photos[0].value",
    token: "id",
  },
  scope: { scope: ["user:email"] },
  auth(cb: CallbackAuth) {
    return new GitHubStrategy.Strategy(
      {
        clientID: CONFIG.GITHUB.KEY,
        clientSecret: CONFIG.GITHUB.SECRET,
        callbackURL,
      },
      (_: string, _2: string, profile: Profile, done: DoneFunction) => {
        cb({ profile, done });
      }
    );
  },
};
