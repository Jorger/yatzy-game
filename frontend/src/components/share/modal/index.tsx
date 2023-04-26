import "./styles.css";
import { $ } from "../../../utils/helpers";
import { createPortal } from "react-dom";
import { ModalShareButtons, ModalShareHeader } from "./components";
import { ShareData } from "../helpers";
import FocusTrap from "focus-trap-react";
import React, { useEffect, useState } from "react";

interface ModalShareProps {
  data: ShareData;
  onCloseModal: (isShare?: boolean) => void;
}

const NAME_ELEMENT = "overlay-share";

const Modal = (props: ModalShareProps) => {
  const [element, setElement] = useState<Element | null>();

  /**
   * Efecto que crea y elimina el elemento para el portal...
   */
  useEffect(() => {
    if (!element) {
      if (!$(`#${NAME_ELEMENT}`)) {
        const newElement = document.createElement("div");
        newElement.id = NAME_ELEMENT;
        $(".screen")?.appendChild(newElement);
        setElement(newElement);
      } else {
        setElement($(`#${NAME_ELEMENT}`));
      }
    }

    return () => {
      if (element && $(".screen")) {
        $(".screen")?.removeChild(element);
      }
    };
  }, [element]);

  return element
    ? createPortal(
        <FocusTrap>
          <div className="modal-share-wrapper">
            <ModalShareHeader onCloseModal={props.onCloseModal} />
            <ModalShareButtons {...props} />
          </div>
        </FocusTrap>,
        element
      )
    : null;
};

export default React.memo(Modal);
