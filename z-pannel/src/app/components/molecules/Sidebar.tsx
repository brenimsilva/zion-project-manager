import React from "react";
import SBItem from "../atoms/SBItem";

export default function Sidebar() {
  return (
    <div className="w-10 flex flex-col justify-center">
      <SBItem href="server-list" icon="fa-brands fa-discord" />
      <SBItem href="/dashboard/data" icon="fa-solid fa-database" />
      <SBItem href="/cyber-sheet" icon="fa-solid fa-sheet-plastic" />
    </div>
  );
}
