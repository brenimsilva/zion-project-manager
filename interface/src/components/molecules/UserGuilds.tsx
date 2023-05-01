import { IDiscordGuild } from "@/services/DiscordService";
import React from "react";

export interface IUserGuildsProps {
  guilds: Array<IDiscordGuild>;
}
export default function UserGuilds({ guilds }: IUserGuildsProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {guilds.map((guild) => {
        return (
          <div
            key={guild.id}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="grid grid-cols-4">
              {
                <div className="col-span-1">
                  <img
                    src={guild.image.src}
                    className="border rounded-lg"
                    width="50"
                  />
                </div>
              }
              <div className="col-span-3">
                <h5 className="">
                  <strong>Nome: </strong>
                  {guild.name}
                </h5>
                <p>
                  <strong>id: </strong>
                  {guild.id}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
