import React, { useContext, useEffect } from "react";
import Guild from "./Guild";
import { IGuildContext, guildContext } from "@/app/store/guild-provider";
import { IDiscordGuild } from "@/app/Util/Interfaces";

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
            imageSrc={guild.imageSrc || ""}
            name={guild.name}
            approximate_member_count={guild.approximate_member_count}
            selected={selectedGuildIds.includes(guild.id)}
          />
        );
      })}
    </React.Fragment>
  );
}
