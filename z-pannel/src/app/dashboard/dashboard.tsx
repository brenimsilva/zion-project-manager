import RequestCenter from "@/components/molecules/RequestCenter";
import Navbar from "@/components/organisms/Navbar";
import GuildProvider from "@/store/guild-provider";
import React from "react";

export default function dashboard() {
  return (
    <div>
      <Navbar />
      <RequestCenter />
    </div>
  );
}
