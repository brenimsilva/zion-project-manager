import { APP_ROUTES } from "@/app/Util/app-routes";
import { authContext } from "@/app/store/auth-provider";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: props) {
  const { push } = useRouter();
  const { user } = useContext(authContext);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isAuthenticated, push]);

  return (
    <React.Fragment>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </React.Fragment>
  );
}
