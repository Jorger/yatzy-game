import CONFIG from "../config";

/**
 * Valida si un string es un JSON valido...
 * @param json
 * @returns
 */
export const isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Generar un hash
 * @returns
 */
export const guid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

/**
 * Establece un valor aleatorio entre dos valores...
 * @param min
 * @param max
 * @returns
 */
export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Valida que el nombre de la sala sea válido...
 * @param value
 * @returns
 */
export const isAValidRoom = (value: string) => {
  const numRegex = /^[1-9]\d*$/;
  return numRegex.test(value) && value.length === CONFIG.ROOM_SIZE_RANGE;
};
