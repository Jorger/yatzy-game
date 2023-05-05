import { isAValidRoom } from "../utils/helpers";
import { ROOM_SIZE_RANGE_BASE } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import GameOnline from "../components/gameOnline";
import React, { useContext, useEffect, useState } from "react";
import SocialAuth from "../components/socialAuth";
import type { IAuthOptions } from "../interfaces";
import UserContext from "../provider/userContext";

const Online = () => {
  const state = useContext(UserContext);
  // Se obtiene el rango de la sala personalizada a crear...
  const { roomRange = ROOM_SIZE_RANGE_BASE } = state || {};
  // Para el estado de los query string en la url...
  const [searchParams, setSearchParams] = useSearchParams();
  // Estado que guardaría el valor de la sala que viene por la url...
  const [roomURL, setRoomURL] = useState("");

  /**
   * Efecto que extrae el valor del query string de la url
   * Además lo elimina para evitar que cuando recargue la página
   * Lo vuelva a tomar...
   */
  useEffect(() => {
    // El valor existe en la url...
    if (searchParams.has("room")) {
      const roomValue = searchParams.get("room") || "";
      // Se elimina el valor de la URL
      searchParams.delete("room");
      // Se establece el nuevo valor...
      setSearchParams(searchParams);

      if (
        isAValidRoom(roomValue, roomRange) &&
        roomValue.length === roomRange
      ) {
        setRoomURL(roomValue);
      }
    }
  }, [roomRange, searchParams, setSearchParams]);

  /**
   * Si el usuario no está autenticado, se muestra el componente con los botones
   * para realizar el proceso de autenticación...
   */
  if (!state?.isAuth) {
    return <SocialAuth authOptions={state?.authOptions as IAuthOptions[]} />;
  }

  /**
   * Muestra el componente para jubabilidad online...
   */
  return <GameOnline state={state} roomURL={roomURL} />;
};

export default React.memo(Online);
