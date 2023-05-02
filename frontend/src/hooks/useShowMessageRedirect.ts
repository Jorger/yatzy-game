import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface IUseShowMessageRedirect {
  route?: string;
  message: {
    title: string;
    icon?: string;
    timer?: number;
  };
}

/**
 * Hook que muestra un mensaje personalizado al usuario
 * y al mismo tiempo lo redirecciona
 * Se hace de esta manera ya que el useNavigate
 * debe estar dentro de un componente
 * @returns
 */
const useShowMessageRedirect = () => {
  const [redirect, setRedirect] = useState<IUseShowMessageRedirect>();
  const navigate = useNavigate();

  useEffect(() => {
    // Se detecta que se ha establecido el title (el único valor requerido)
    // Se establece que debe mostar el mensaje y hacer el redirect...
    if (redirect?.message.title) {
      // Muestra el mensaje...
      swal({ ...redirect.message, closeOnEsc: false });

      // Hacer la redirección...
      navigate(redirect.route || "/");
    }
  }, [navigate, redirect]);

  return setRedirect;
};

export default useShowMessageRedirect;
