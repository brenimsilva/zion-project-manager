import Image from "next/image";
import { Inter } from "next/font/google";
import Colors from "./Util/Colors";
import TButton from "./components/atoms/TButton";
import LandingPage from "./components/organisms/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
