import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Planilha from "./components/Planilha";
import Wallet from "./components/Wallet";

function App() {
  return (
    <div>
      <Planilha />
      {/* <Wallet /> */}
    </div>
  );
}

export default App;
