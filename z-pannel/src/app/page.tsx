import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/organisms/Navbar";
import { useTransition } from "react";
import UserService from "./services/datamatrix/UserService";
import TButton from "./components/atoms/TButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="h-screen grid grid-cols-2">
        <div className=" h-screen ">
          <div
            id="content"
            className="flex justify-center items-center h-screen flex-col ml-10 mr-10"
          >
            <h1 className="font-bold text-5xl capitalize mb-10">
              A Hub designed to help NFT people
            </h1>
            <p className="mb-10">
              Are you ready to start your adventure and start building something
              great with Z-PANNEL?
            </p>
            {/* @ts-expect-error */}
            <TButton />
            <button className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded">
              See more
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen">
          <Image alt="image" width={700} height={700} src={"/l1.png"} />
        </div>
      </main>
    </div>
  );
}
