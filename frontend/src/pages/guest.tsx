import { useNavigate } from "react-router-dom";
import PlayAsGuest from "../components/playAsGuest";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../provider/userContext";

const Guest = () => {
  const navigate = useNavigate();
  const state = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Efecto que valida si el usuario está auténticado
   * si es así lo rediteccionará a la página de online
   */
  useEffect(() => {
    if (state?.isAuth) {
      navigate("/online");
    }

    setIsLoading(false);
  }, [navigate, state]);

  return !isLoading ? <PlayAsGuest /> : null;
};

export default React.memo(Guest);
