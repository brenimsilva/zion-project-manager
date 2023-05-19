"use client";
import React, { useState } from "react";
import Title from "../components/atoms/Title";
import RegisterForm from "../components/molecules/RegisterForm";

export default function page() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Title text="Register" />
      <RegisterForm />
    </div>
  );
}
