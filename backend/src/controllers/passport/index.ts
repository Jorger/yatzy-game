import get from "lodash.get";
import passport, { use } from "passport";
import PASSPORT_STRATEGIES, { Strategies } from "./strategies";
import User from "../../models/user";

const passportController = () => {
  /**
   * Determina que información del usuario será almacenada en el sesión
   * En este caso se guardará el id del usuario...
   */
  passport.serializeUser((data, done) => {
    done(null, { id: (data as { _id: string })._id });
  });

  /**
   * Con el valor guardado en la sesión, se obtiene el usuario autenticado
   * este valor se pasa posteriormente al req
   */
  passport.deserializeUser(async (data, done) => {
    const _id = (data as { id: string }).id;

    try {
      const user = await User.findById(_id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  /**
   *Configurar las diferentes estrategías en passport
   */
  Object.keys(PASSPORT_STRATEGIES).forEach((strategy) => {
    const { socialType, socialName, fileds, isEnabled, auth } =
      PASSPORT_STRATEGIES[strategy as Strategies];

    // Verifica que la estrategía este habilitada...
    if (isEnabled) {
      passport.use(
        auth(async ({ profile, done }) => {
          // Se crea dinamicamente la data que se desea obtener del servicio.
          // esta es la que se guardará en la base de datos...
          const dataFields = Object.keys(fileds).reduce(
            (a, s) => ({
              ...a,
              [s]: get(profile, fileds[s as never], ""),
            }),
            {}
          );

          // La condición de búsqueda que se le pasará a mongo,
          // se valida el token devuelto por el servicio, además el tipo de red social
          // Es casi imporbable que dos servicios devulevan el mismo token/id, pero para
          // asegurar que eso no pase se valida también el valor de la red social...
          const conditions = {
            token: (dataFields as { token: string }).token,
            socialType,
          };

          let user = await User.findOne(conditions);

          if (!user) {
            user = new User({
              ...dataFields,
              socialType,
              socialName,
            });

            await user.save();
          }

          return done(null, user);
        })
      );
    }
  });
};

export default passportController;
