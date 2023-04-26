type IStorageType = "localStorage" | "sessionStorage";

const CACHE_KEY = "YATZY_REACT";

/**
 * Guarda la información en caché (session o localstorage)...
 * @param data
 * @param storageType
 */
export const saveCache = (
  data: any,
  storageType: IStorageType = "localStorage"
) => {
  const finalData = JSON.stringify(data);
  window[storageType].setItem(CACHE_KEY, finalData);
};

/**
 * Obtener la data que está guardarda en localStorage/sessionStorage
 */
export const getDataCache = (storageType: IStorageType = "localStorage") => {
  const data = window[storageType].getItem(CACHE_KEY) || "";
  return data !== "" ? JSON.parse(data) : {};
};

/**
 * Guarda valores de una propiedad en localstorage
 * @param {*} property
 * @param {*} value
 */
export const savePropierties = (
  property: string,
  value: any,
  storageType: IStorageType = "localStorage"
) => {
  const localCache = getDataCache(storageType);
  localCache[property] = value;
  saveCache(localCache, storageType);
};

/**
 * Dada una propiedad, devuelve la información de la misma
 */
export const getValueFromCache = (
  key: string = "",
  initial: any,
  storageType: IStorageType = "localStorage"
) => {
  const localCache = getDataCache(storageType);
  return localCache[key] || initial;
};
