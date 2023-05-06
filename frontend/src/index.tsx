import "./index.css";
import * as serviceWorker from "./serviceWorkerRegistration";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log(
  `%cGame developed by Jorge Rubiano.
    You can find me at:
    * Twitter : https://twitter.com/ostjh
    * Github : https://github.com/jorger
    * Linkedin : https://www.linkedin.com/in/jorge-rubiano-a8616319`,
  "color:red; font-size:20px; font-weight: bold; -webkit-text-stroke: 1px black; border-radius:10px; padding: 20px; background-color: black;"
);

/**
 * Se establecen eventos para el service worker, para determinar si se debe actualizar
 */
serviceWorker.register({
  onSuccess: () => {
    const event = new CustomEvent("changeServiceWorker", {
      detail: { type: "SW_INIT" },
    });
    document.dispatchEvent(event);
  },
  onUpdate: (registration) => {
    // Cuando existe una nueva versión de la aplicación se ejcuta el evento
    const event = new CustomEvent("changeServiceWorker", {
      detail: {
        type: "SW_UPDATE",
        payload: registration,
      },
    });
    document.dispatchEvent(event);
  },
});
