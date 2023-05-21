"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import AuthService from "../services/datamatrix/auth/AuthService";

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
};

type props = {
  children: ReactNode;
};

export const authContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState();
  async function signIn() {}

  useEffect(() => {
    const token = localStorage.getItem("datamatrix.token");
    if (token) {
      AuthService.recoverUserInfo(token).then((response) => {
        console.log(response);
        setUser(response);
      });
    }
  }, []);

  async function verifyLogin() {
    const auth = await AuthService.auth();
    if (!auth) console.log("Login falhou");
  }

  return (
    <authContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </authContext.Provider>
  );
}
