import { ROOM_SIZE_RANGE_BASE } from "./constants";

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const isMobile = (): boolean =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const debounce = (fn: Function, delay: number) => {
  var t: number;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn, delay);
  };
};

/**
 * Devuleve un número "aleatorio", dado un rango...
 * @param min
 * @param max
 * @returns
 */
export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Establece una interrupción...
 * @param ms
 * @returns
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Copiar un texto en el portapapeles...
 * @param {*} text
 */
export const copyToClipboard = (text: string = "") => {
  navigator.clipboard.writeText(text);
};

/**
 * Si se encuentra en el ambiente de desarrollo...
 * @returns
 */
export const isDev = () => process.env.NODE_ENV === "development";

/**
 * Valida si el valor de una sala en la jugabilidad online es valida
 * @param value
 * @param roomRange
 * @returns
 */
export const isAValidRoom = (
  value: string,
  roomRange = ROOM_SIZE_RANGE_BASE
) => {
  const numRegex = /^[1-9]\d*$/;
  return numRegex.test(value) && value.length <= roomRange;
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
