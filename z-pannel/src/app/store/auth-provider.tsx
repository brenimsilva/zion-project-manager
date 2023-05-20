"use client";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
};

type props = {
  children: ReactNode;
};

export const authContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  async function signIn() {}

  return (
    <authContext.Provider value={{ isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
}
