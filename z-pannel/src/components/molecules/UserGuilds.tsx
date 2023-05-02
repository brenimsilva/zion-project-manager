import { IDiscordGuild } from "@/services/DiscordService";
import React, { useState } from "react";
import Guild from "./Guild";

export interface IUserGuildsProps {
  guilds: Array<IDiscordGuild>;
}
export default function UserGuilds({ guilds }: IUserGuildsProps) {
  return (
    <div className="">
      <h5 className="p-5">
        <strong>
          Servidores: <span className="text-green-500">{guilds.length}</span>
        </strong>
      </h5>
      <div className="grid grid-cols-4 gap-5">
        {guilds.map((guild) => {
          return (
            <Guild
              key={guild.id}
              id={guild.id}
              imageSrc={guild.image.src}
              name={guild.name}
            />
          );
        })}
      </div>
    </div>
  );
}
