import { IDiscordGuild } from "@/services/DiscordService";
import React, { useRef, useState } from "react";
import Guild from "./Guild";
import Select from "./Select";

export interface IUserGuildsProps {
  guilds: Array<IDiscordGuild>;
}
export default function UserGuilds({ guilds }: IUserGuildsProps) {
  const [cols, setCols] = useState<string | number>(1);
  return (
    <div className="">
      <h5 className="p-5">
        <strong>
          Servidores: <span className="text-green-500">{guilds.length}</span>
        </strong>
      </h5>
      <div className="p-5">
        <strong>Cols</strong>
        <select
          className="data-te-select-init"
          onChange={(e) => {
            setCols(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className={`grid grid-cols-${cols} gap-5`}>
        {guilds.map((guild) => {
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
      </div>
    </div>
  );
}
