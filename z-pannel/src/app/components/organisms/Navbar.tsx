import React from "react";
import NavTag from "../atoms/NavTag";
import Logo from "../atoms/Logo";
import RouteButton from "../atoms/RouteButton";

// require("dotenv").config();
export default function Navbar() {
  const color = "violet";
  return (
    <div className="nav-bar  ">
      <nav className="flex items-center justify-between flex-wrap p-4 shadow-md absolute w-full">
        <div className="flex items-center flex-shrink-0  mr-6">
          <Logo />
          <span className="font-semibold text-xl tracking-tight text-marsWhite">
            Z-Pannel
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            className={`flex items-center px-3 py-2 border rounded text-${color}-200 border-${color}-400 hover:text-marsHL2 hover:border-marsHL2`}
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
            <NavTag text="Dashboard" href="/dashboard" />
          </div>
          <div>
            <RouteButton
              borderColor="marsWhite"
              hoverBorderColor="marsHL1"
              hoverTextColor="marsHL1"
              textColor="marsWhite"
              text="Login"
              route="/login"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
