import { IDiscordGuild } from "@/app/services/discord/IDiscord";
import React, { useContext, useEffect } from "react";
import Guild from "./Guild";
import { IGuildContext, guildContext } from "@/app/store/guild-provider";

interface ListGuildProps {
  filteredList: Array<IDiscordGuild>;
}

export default function ListGuilds({ filteredList }: ListGuildProps) {
  const { selectedGuildIds } = useContext(guildContext) as IGuildContext;

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
            selected={selectedGuildIds.includes(guild.id) ? true : false}
          />
        );
      })}
    </React.Fragment>
  );
}
