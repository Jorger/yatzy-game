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
