import { Inter } from "next/font/google";
import UserProvider from "../store/user-provider";
import GuildProvider from "../store/guild-provider";
import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/molecules/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-red-500 w-full">{children}</div>
    </div>
  );
}
