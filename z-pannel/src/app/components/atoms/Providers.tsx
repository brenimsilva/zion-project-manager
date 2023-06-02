"use client";
import AuthProvider from "@/app/store/auth-provider";
import GuildProvider from "@/app/store/guild-provider";
import UserProvider from "@/app/store/user-provider";
import React from "react";

interface props {
  children: React.ReactNode;
}

export default function Providers({ children }: props) {
  return (
    <AuthProvider>
      <GuildProvider>
        <UserProvider>{children}</UserProvider>
      </GuildProvider>
    </AuthProvider>
  );
}
