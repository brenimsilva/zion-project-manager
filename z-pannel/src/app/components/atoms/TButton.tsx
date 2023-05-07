"use server";
import UserService from "@/app/services/datamatrix/UserService";
import React from "react";

export default async function TButton() {
  const data = await UserService.getAll();
  return (
    <div>
      <div>{JSON.stringify(data)}</div>;<button>CONFIRMAR</button>
    </div>
  );
}
