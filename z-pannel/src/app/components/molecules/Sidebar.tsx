import React from "react";
import SBItem from "../atoms/SBItem";

export default function Sidebar() {
  return (
    <div className="w-40 bg-red-200">
      <SBItem
        text="Server List"
        href="server-list"
        icon="fa-brands fa-discord"
      />
      <SBItem text="Data" href="/dashboard/data" icon="fa-solid fa-database" />
      <SBItem
        text="Cyber Sheet"
        href="/cyber-sheet"
        icon="fa-solid fa-sheet-plastic"
      />
    </div>
  );
}
