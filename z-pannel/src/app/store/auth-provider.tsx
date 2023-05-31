"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import AuthService from "../services/datamatrix/auth/AuthService";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  signIn: ({ login, password }: loginProps) => Promise<void>;
};

type props = {
  children: ReactNode;
};

interface loginProps {
  login: string;
  password: string;
}

export const authContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: props) {
  const [user, setUser] = useState<DMUserProjection | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  async function signIn({ login, password }: loginProps) {
    const {
      token,
      user: { data: user },
    } = await AuthService.login({ login, password });
    setCookie(undefined, "datamatrix.token", token, {
      maxAge: 60 * 60 * 10, //10 hours
    });
    setUser(user);
    console.log(user);

    router.push("/dashboard");
  }

  return (
    <authContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </authContext.Provider>
  );
}
