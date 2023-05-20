"use client";
import React, { useState } from "react";
import Title from "../components/atoms/Title";
import LoginForm from "../components/organisms/LoginForm";

export default function page() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Title text="Sign in to your account" />
      <LoginForm />
    </div>
  );
}
