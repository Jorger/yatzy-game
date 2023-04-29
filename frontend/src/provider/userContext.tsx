import React from "react";
import type { IAuth } from "../interfaces";

const UserContext = React.createContext<IAuth | null>(null);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
