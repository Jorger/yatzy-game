import "./styles.css";
import {
  useFetch,
  useUpdateServiceWorker,
  useWindowResize,
} from "../../../hooks";
import { UserProvider } from "../../../provider/userContext";
import AlertUpdateApp from "../../alertUpdateApp";
import Loading from "../../loading";
import React from "react";
import type { IAuth } from "../../../interfaces";

const AppWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  useWindowResize();
  const serviceWorkerInformation = useUpdateServiceWorker();
  const { data, loading } = useFetch("/api/me");

  if (loading) return <Loading />;

  return (
    <UserProvider value={data as IAuth}>
      <div className="container">
        <div className="screen">
          {/* 
            Si hay una nueva versión de la aplicación, 
            se mostrará el banner para actualizar  
          */}
          {serviceWorkerInformation?.serviceWorkerUpdated && (
            <AlertUpdateApp
              serviceWorkerRegistration={
                serviceWorkerInformation.serviceWorkerRegistration
              }
            />
          )}
          {children}
        </div>
      </div>
    </UserProvider>
  );
};

export default React.memo(AppWrapper);
