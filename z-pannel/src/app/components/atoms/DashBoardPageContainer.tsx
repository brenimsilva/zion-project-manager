"use client";
import { authContext } from "@/app/store/auth-provider";
import React, { ReactNode, useContext } from "react";

export interface IChildren {
  children: ReactNode;
}

export default function DashBoardPageContainer({ children }: IChildren) {
  const ctx = useContext(authContext);
  console.log(ctx.user);
  return <div className="p-5 bg-marsWhite h-full">{children}</div>;
}
