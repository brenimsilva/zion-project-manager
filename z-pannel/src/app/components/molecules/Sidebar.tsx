import React from "react";
import SBItem from "../atoms/SBItem";

export default function Sidebar() {
  return (
    <div>
      <SBItem text="Server List" href="server-list" />
      <SBItem text="Dashboard" href="dashboard" />
      <SBItem text="Graphic View" href="graphic-view" />
    </div>
  );
}
