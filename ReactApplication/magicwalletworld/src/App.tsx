import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  function updateTabela() {
    fetch("http://localhost:5000/update")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div className="App">
      <button onClick={updateTabela}>Update Tabela</button>
    </div>
  );
}

export default App;
