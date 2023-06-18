import React from "react";

export default function Logo() {
  return (
    <React.Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler text-cDark icon-tabler-device-desktop-analytics h-8 w-8 mr-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 4m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"></path>
        <path d="M7 20h10"></path>
        <path d="M9 16v4"></path>
        <path d="M15 16v4"></path>
        <path d="M9 12v-4"></path>
        <path d="M12 12v-1"></path>
        <path d="M15 12v-2"></path>
        <path d="M12 12v-1"></path>
      </svg>
    </React.Fragment>
  );
}
