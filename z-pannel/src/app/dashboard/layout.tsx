"use client";
import { Inter } from "next/font/google";
import Sidebar from "../components/molecules/Sidebar";
import DashBoardPageContainer from "../components/atoms/DashBoardPageContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex h-full">
        <Sidebar />
        <div className="w-full">
          <DashBoardPageContainer>{children}</DashBoardPageContainer>
        </div>
      </div>
    </div>
  );
}
