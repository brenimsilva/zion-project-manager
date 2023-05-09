import { IDiscordGuild } from "@/app/services/discord/IDiscord";
import React from "react";
import Guild from "./Guild";

interface ListGuildProps {
  filteredList: Array<IDiscordGuild>;
}

export default function ListGuilds({ filteredList }: ListGuildProps) {
  return (
    <React.Fragment>
      {filteredList.map((guild) => {
        return (
          <Guild
            key={guild.id}
            id={guild.id}
            imageSrc={guild.image.src}
            name={guild.name}
            approximate_member_count={guild.approximate_member_count}
          />
        );
      })}
    </React.Fragment>
  );
}
