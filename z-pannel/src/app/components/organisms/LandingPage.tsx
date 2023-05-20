import Colors from "@/app/Util/Colors";
import React from "react";
import Image from "next/image";
import RouteButton from "../atoms/RouteButton";

export default function LandingPage() {
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
            <RouteButton
              borderColor="cHL"
              hoverBorderColor="cWhite"
              hoverTextColor="cWhite"
              textColor="cHL"
              text="Start Now!"
              route="/login"
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
