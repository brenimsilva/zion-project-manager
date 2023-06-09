import Colors from "@/app/Util/Colors";
import React from "react";
import Image from "next/image";
import RouteButton from "../atoms/RouteButton";
import InfoBox from "../atoms/InfoBox";
import Title from "../atoms/Title";


const stats = [{id: 1, name: "Discord integration", value: "Create profiles to manage"}, {id: 2, name: "Store your projects social media links", value: "Easy to manage"}, {id: 3, name: "Be updated with all your giveaway", value: "Giveaways!"}]

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

        <div className="flex h-3/6">
          <div className="flex flex-col w-full items-center my-10">
          <Title text="Our core features" color="marsDark"/>
            <div className="flex p-6">
              <InfoBox listStats={stats}/>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
