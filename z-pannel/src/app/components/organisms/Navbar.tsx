"use client";
import React from "react";
import NavTag from "../atoms/NavTag";
import Logo from "../atoms/Logo";
import RouteButton from "../atoms/RouteButton";

interface props {
  display: string;
}

// require("dotenv").config();
export default function Navbar({ display }: props) {
  return (
    <div className="nav-bar">
      <nav
        className={`flex items-center justify-between p-4 shadow-md ${display} w-full h-20`}
      >
        <div className="flex items-center flex-shrink-0  mr-6 p-4">
          <Logo />
          <span className="font-semibold text-xl tracking-tight text-cDark">
            Z-Pannel
          </span>
        </div>
        <div className="w-full block flex-grow flex items-center w-auto">
          <div className="text-sm flex-grow text-end mr-5">
            <NavTag text="Home" href="/" />
            <NavTag text="Dashboard" href="/dashboard" />
          </div>
          <div>
            <RouteButton
              borderColor="cDark"
              hoverBorderColor="cBlue"
              hoverTextColor="cBlue"
              textColor="cDark"
              text="Login"
              route="/login"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
