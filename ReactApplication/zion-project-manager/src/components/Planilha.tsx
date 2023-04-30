import React, { useState } from "react";
import PlanilhaService from "../services/PlanilhaService";

export interface IMessage {
  message: string;
  error: string;
}

export default function Planilha() {
  const [message, setMessage] = useState<IMessage>({ message: "", error: "" });
  const [data, setData] = useState<Array<Object> | null>();

  function updateTabela() {
    PlanilhaService.updateTabela().then((response) => {
      setMessage({ message: response.message, error: response.error });
      setData(response.data);
    });
  }

  return (
    <div className="App">
      <h5 style={{ color: "red" }}>{message.error}</h5>
      <button onClick={updateTabela}>Update Tabela</button>
      <h5 style={{ color: "green" }}>{message.message}</h5>
    </div>
  );
}
