import { ambientSound } from "../utils/sounds";
import { getValueFromCache, savePropierties } from "../utils/storage";
import { useState } from "react";

/**
 * Hook para el estado de los sonido...
 * @returns
 */
const useSounds = () => {
  const [withSound, setWithSound] = useState(
    () => getValueFromCache("sounds", "yes") === "yes"
  );

  /**
   * Función que cambia el estado del sonido...
   */
  const toggleSound = () => {
    const newWithSound = !withSound;
    setWithSound(newWithSound);
    savePropierties("sounds", newWithSound ? "yes" : "no");
    ambientSound[newWithSound ? "play" : "stop"]();
  };

  return { toggleSound, withSound };
};

export default useSounds;
