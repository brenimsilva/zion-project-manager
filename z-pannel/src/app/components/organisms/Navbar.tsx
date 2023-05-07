import React from "react";
import NavTag from "../atoms/NavTag";

// require("dotenv").config();
export default function Navbar() {
  const color = "violet";
  return (
    <div className="nav-bar">
      <nav className="flex items-center justify-between flex-wrap bg-violet-950 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-device-desktop-analytics h-8 w-8 mr-2"
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
          <span className="font-semibold text-xl tracking-tight">Z-Pannel</span>
        </div>
        <div className="block lg:hidden">
          <button
            className={`flex items-center px-3 py-2 border rounded text-${color}-200 border-${color}-400 hover:text-white hover:border-white`}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow text-end mr-5">
            <NavTag text="Home" href="/" />
            <NavTag text="Discord" href="/discord" />
            <NavTag text="Cyber Sheet" href="/cybersheet" />
          </div>
          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
