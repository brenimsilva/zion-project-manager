import { Inter } from "next/font/google";
import LandingPage from "./components/organisms/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
