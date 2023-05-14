import Image from "next/image";
import { Inter } from "next/font/google";
import Colors from "./Util/Colors";
import TButton from "./components/atoms/TButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <main className="h-screen grid grid-cols-2">
        <div className=" h-screen ">
          <div
            id="content"
            className="flex justify-center items-center h-screen flex-col ml-20 mr-20 bg-cDark"
          >
            <div className="p-5">
              <h1
                className="font-bold text-5xl capitalize mb-10 text-cHL"
                style={{
                  filter: `drop-shadow(3px 3px 1px ${Colors.cHL2})`,
                }}
              >
                A Hub designed to help NFT people
              </h1>
              <p
                className="mb-10 text-cHL"
                style={{ filter: `drop-shadow(3px 3px 1px ${Colors.cHL2})` }}
              >
                Are you ready to start your adventure and start building
                something great with Z-PANNEL?
              </p>
            </div>
            <TButton
              borderColor="cHL"
              hoverBorderColor="cWhite"
              hoverTextColor="cWhite"
              textColor="cHL"
              text="Build Your Dashboard"
            />
          </div>
        </div>
        <div className="flex justify-center items-center h-screen">
          <Image
            alt="image"
            width={700}
            height={700}
            src={"/I3.png"}
            className="rounded rounded-full"
            style={{ filter: "drop-shadow(30px 10px 4px #4444dd)" }}
          />
        </div>
      </main>
    </div>
  );
}
