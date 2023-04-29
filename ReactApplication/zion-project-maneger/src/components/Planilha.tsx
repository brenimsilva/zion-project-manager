import React, { useState } from "react";

export default function Planilha() {
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Array<Object> | null>();
  async function updateTabela() {
    try {
      const response = await fetch("http://localhost:5000/update");
      const data = await response.json();
      setData(data);
      setError("");
    } catch {
      setError("Falhou ao executar alterações na planilha");
      setData(null);
    }
  }
  return (
    <div className="App">
      <h5 style={{ color: "red" }}>{error}</h5>
      <button onClick={updateTabela}>Update Tabela</button>
      <h5>{JSON.stringify(data)}</h5>
    </div>
  );
}
