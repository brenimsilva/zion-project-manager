import { IDiscordGuild } from "@/services/DiscordService";
import React, { useState } from "react";
import Guild from "./Guild";

export interface IUserGuildsProps {
  guilds: Array<IDiscordGuild>;
}
export default function UserGuilds({ guilds }: IUserGuildsProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {guilds.map((guild) => {
        return (
          <Guild id={guild.id} imageSrc={guild.image.src} name={guild.name} />
        );
      })}
    </div>
  );
}
