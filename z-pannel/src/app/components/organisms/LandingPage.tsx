import Colors from "@/app/Util/Colors";
import React from "react";
import Image from "next/image";
import RouteButton from "../atoms/RouteButton";

export default function LandingPage() {
  return (
    <React.Fragment>
      <main className="h-screen">
        {/* <Image src={"/marslandscape.jpg"} width={1000} height={100} /> */}
        <img src="/marslandscape4.jpg" className="w-full h-3/6 object-cover" />
        {/* <RouteButton
              borderColor="cHL"
              hoverBorderColor="cWhite"
              hoverTextColor="cWhite"
              textColor="cHL"
              text="Start Now!"
              route="/login"
            /> */}

        <div className="flex justify-center items-center h-screen">
          {/* <Image
            alt="image"
            width={700}
            height={700}
            src={"/I3.png"}
            className="rounded rounded-full"
            style={{ filter: "drop-shadow(30px 10px 4px #4444dd)" }}
          /> */}
        </div>
      </main>
    </React.Fragment>
  );
}
