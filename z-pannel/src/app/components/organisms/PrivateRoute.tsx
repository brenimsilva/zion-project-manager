import { APP_ROUTES, checkLocalStorageToken } from "@/app/Util/app-routes";
import AuthService from "@/app/services/datamatrix/auth/AuthService";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: props) {
  const { push } = useRouter();

  const token = checkLocalStorageToken();
  console.log(token);

  useEffect(() => {
    if (!token) {
      push(APP_ROUTES.public.login);
    }
  }, [token, push]);

  return (
    <React.Fragment>
      {!token && null}
      {token && children}
    </React.Fragment>
  );
}
