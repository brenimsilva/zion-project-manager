import React, { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export default function DashBoardPageContainer({ children }: IChildren) {
  return <div className="p-5 bg-cWhite h-full">{children}</div>;
}
