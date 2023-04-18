import swal from "sweetalert";

export const handleBack = (cb: (action: boolean) => void) => {
  swal({
    title: "Exit",
    text: "Are you sure you want to quit the game?",
    icon: "info",
    closeOnClickOutside: false,
    closeOnEsc: false,
    buttons: ["NO", "YES"],
  }).then((value) => cb(!!value));
};
