"use client";
import React, { useEffect } from "react";
import SBItem from "../atoms/SBItem";

export default function Sidebar() {
  return (
    <div className="w-10 flex flex-col justify-center">
      <SBItem href="/dashboard" icon="fa-solid fa-house" />
      <SBItem href="/dashboard/server-list" icon="fa-brands fa-discord" />
      <SBItem href="/dashboard/data" icon="fa-solid fa-database" />
      <SBItem href="/dashboard/cyber-sheet" icon="fa-solid fa-sheet-plastic" />
    </div>
  );
}
