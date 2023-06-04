"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import AuthService from "../services/datamatrix/auth/AuthService";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { DMUserProjection } from "../projections/DMProjections";

type AuthContextType = {
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

  async function signIn({ login, password }: loginProps) {
    const { user, token } = await AuthService.login({ login, password });

    // setCookie(undefined, "datamatrix.token", token, {
    //   maxAge: 60 * 60 * 10, //10 hours
    // });

    setUser(user);
    console.log(user);

    router.push("/dashboard");
  }

  async function signInWithToken(token: string) {
    const user = await AuthService.recoverUserInfo(token);
    setUser(user);
    console.log("Sign in with token successful");
    console.log(user);
  }

  useEffect(() => {
    const { "datamatrix.token": token } = parseCookies();
    if (token) {
      AuthService.recoverUserInfo(token).then((user) => {
        setUser(user);
      });
    }
  }, []);

  return (
    <authContext.Provider value={{ user, signIn }}>
      {children}
    </authContext.Provider>
  );
}
