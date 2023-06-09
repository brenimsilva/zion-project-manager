"use client";
import React, { ReactNode, createContext, useState } from "react";
import { IDiscordUser } from "../Util/Interfaces";

const defaultState: IDiscordUser = {
  avatar: "",
  guilds: [],
  id: "",
  username: "",
};

interface IUserContext {
  user: IDiscordUser;
  setUser: (user: IDiscordUser) => any;
}

interface IUCProps {
  children: ReactNode;
}

export const userContext = createContext<IUserContext>({} as IUserContext);

export default function UserProvider({ children }: IUCProps) {
  const [user, setUser] = useState<IDiscordUser>(defaultState);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
