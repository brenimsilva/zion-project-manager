import { Inter } from "next/font/google";
import LandingPage from "./components/organisms/LandingPage";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <React.Fragment>
      <LandingPage />
    </React.Fragment>
  );
}
