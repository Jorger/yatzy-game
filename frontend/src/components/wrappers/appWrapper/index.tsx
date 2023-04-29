import "./styles.css";
import { useFetch, useWindowResize } from "../../../hooks";
import { UserProvider } from "../../../provider/userContext";
import Loading from "../../loading";
import React from "react";
import type { IAuth } from "../../../interfaces";

const AppWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  useWindowResize();
  const { data, loading } = useFetch("/api/me");

  if (loading) return <Loading />;

  return (
    <UserProvider value={data as IAuth}>
      <div className="container">
        <div className="screen">{children}</div>
      </div>
    </UserProvider>
  );
};

export default React.memo(AppWrapper);
