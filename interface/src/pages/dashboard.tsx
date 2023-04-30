import RequestCenter from "@/components/molecules/RequestCenter";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function dashboard() {
  return (
    <div>
      <Navbar />
      <RequestCenter />
    </div>
  );
}
