import { APP_ROUTES } from "@/app/Util/app-routes";
import AuthService from "@/app/services/datamatrix/auth/AuthService";
import { authContext } from "@/app/store/auth-provider";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: props) {
  const { push } = useRouter();
  const { user } = useContext(authContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

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
