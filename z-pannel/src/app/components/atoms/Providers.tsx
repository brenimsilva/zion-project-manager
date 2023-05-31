"use client";
import AuthProvider from "@/app/store/auth-provider";
import React from "react";

interface props {
  children: React.ReactNode;
}

export default function Providers({ children }: props) {
  return <AuthProvider>{children}</AuthProvider>;
}
