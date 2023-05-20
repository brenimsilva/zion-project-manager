"use client";
import React from "react";
import NavTag from "../atoms/NavTag";
import Logo from "../atoms/Logo";
import Colors from "@/app/Util/Colors";
import { useRouter } from "next/navigation";

// require("dotenv").config();
export default function Navbar() {
  const route = useRouter();
  const color = "violet";
  return (
    <div className="nav-bar">
      <nav className="flex items-center justify-between bg-cDark flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Logo />
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
            <NavTag text="Dashboard" href="/dashboard" />
          </div>
          <div>
            <button
              onClick={() => route.push("/login")}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-cHL border-cHL hover:border-transparent hover:text-cWhite hover:bg-cHL mt-4 lg:mt-0"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
