import GameOnline from "../components/gameOnline";
import React, { useContext } from "react";
import SocialAuth from "../components/socialAuth";
import type { IAuthOptions } from "../interfaces";
import UserContext from "../provider/userContext";

const Online = () => {
  const state = useContext(UserContext);

  /**
   * Si el usuario no está autenticado, se muestra el componente con los botones
   * para realizar el proceso de autenticación...
   */
  if (!state?.isAuth) {
    return <SocialAuth authOptions={state?.authOptions as IAuthOptions[]} />;
  }

  return <GameOnline state={state} />;
};

export default React.memo(Online);
