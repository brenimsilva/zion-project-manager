import React from "react";
import SBItem from "../atoms/SBItem";

export default function Sidebar() {
  return (
    <div className="p-1 shadow h-full">
      <div className="w-12 flex flex-col justify-center">
        <SBItem href="/dashboard" icon="fa-solid fa-house" />
        <SBItem href="/dashboard/server-list" icon="fa-brands fa-discord" />
        <SBItem href="/dashboard/data" icon="fa-solid fa-database" />
        <SBItem
          href="/dashboard/cyber-sheet"
          icon="fa-solid fa-sheet-plastic"
        />
        <SBItem
          href="/dashboard/profile-register"
          icon="fa-solid fa-user-plus"
        />
        <SBItem href="/dashboard/admin" icon="fa-solid fa-lock" />
      </div>
    </div>
  );
}
