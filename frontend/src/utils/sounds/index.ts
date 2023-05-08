import { getValueFromCache } from "../storage";
import { Howl } from "howler";
import backgroundSound from "./background_sound.mp3";
import soundsSource from "./sounds.mp3";

export const ambientSound = new Howl({
  src: [backgroundSound],
  autoplay: getValueFromCache("sounds", "yes") === "yes",
  loop: true,
  volume: 0.2,
});

export const sounds = new Howl({
  src: [soundsSource],
  sprite: {
    click: [0, 60],
    dice: [70, 650],
    yatzy: [700, 3000],
  },
});

/**
 * Helper que valida si el sonido está habilitado...
 * Consume la información que está en localstorage
 * Por defecto el valor es yes, indicando que si está habilitado.
 * @param sound
 */
export const playSounds = (sound: "click" | "dice" | "yatzy") => {
  if (getValueFromCache("sounds", "yes") === "yes") {
    sounds.play(sound);
  }
};
