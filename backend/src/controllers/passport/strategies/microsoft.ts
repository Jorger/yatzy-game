import { Profile } from "passport";
import CONFIG from "../../../config";
import MicrosoftStrategy from "passport-microsoft";
import type { CallbackAuth, DoneFunction } from "../../../interfaces";

// Se deja por fuera para poderlo reusar en dos partes...
const callbackURL = "/api/auth/microsoft/callback";
const isEnabled = !!(CONFIG.MICROSOFT.KEY && CONFIG.MICROSOFT.SECRET);

export default {
  isEnabled,
  callbackURL,
  routerURL: "/api/auth/microsoft",
  socialName: "microsoft",
  socialType: 2,
  fileds: {
    name: "displayName",
    token: "id",
    email: "emails[0].value",
  },
  scope: {},
  auth(cb: CallbackAuth) {
    return new MicrosoftStrategy.Strategy(
      {
        clientID: CONFIG.MICROSOFT.KEY,
        clientSecret: CONFIG.MICROSOFT.SECRET,
        callbackURL,
        scope: ["user.read"],
        authorizationURL:
          "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      },
      (_: string, _2: string, profile: Profile, done: DoneFunction) => {
        cb({ profile, done });
      }
    );
  },
};
