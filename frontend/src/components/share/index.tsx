import { shareLink, ShareData, successMessage } from "./helpers";
import Modal from "./modal";
import React, { useState } from "react";

// Valida si el bowser soporta la opción de compartir...
const SHARE_AVAILABLE = "share" in navigator;

interface ShareProps {
  children: JSX.Element;
  data: ShareData;
  useNativeOption?: boolean;
}

const Share = ({ children, data, useNativeOption = true }: ShareProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClick = () => {
    if (SHARE_AVAILABLE && useNativeOption) {
      shareLink(data);
    } else {
      setIsVisible(true);
    }
  };

  const onCloseModal = (isShare = false) => {
    if (isShare) {
      successMessage();
    }

    setIsVisible(false);
  };

  return (
    <React.Fragment>
      {/* Se le adiciona el evento onclick al elemento */}
      {React.cloneElement(children, { onClick })}
      {/* 
        Si no está disponible la opción del share en el navegador
        se inyecta el modal personalizado
      */}
      {isVisible && <Modal data={data} onCloseModal={onCloseModal} />}
    </React.Fragment>
  );
};

export default React.memo(Share);
