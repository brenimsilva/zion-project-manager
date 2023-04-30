import React from "react";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <ul className="nav-ul">
        <li className="nav-li">
          <a className="nav-a" href="/">
            Home
          </a>
        </li>
        <li className="nav-li">
          <a className="nav-a" href="/dashboard">
            Dashboard
          </a>
        </li>
      </ul>
    </div>
  );
}
