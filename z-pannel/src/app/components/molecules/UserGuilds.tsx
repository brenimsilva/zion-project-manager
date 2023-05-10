import React, { useEffect, useRef, useState } from "react";
import Guild from "./Guild";
import { IDiscordGuild } from "@/app/services/discord/IDiscord";
import SimpleSelect from "../atoms/SimpleSelect";
import ListGuilds from "./ListGuilds";

export interface IUserGuildsProps {
  guilds: Array<IDiscordGuild>;
}
export default function UserGuilds({ guilds }: IUserGuildsProps) {
  const [orderParam, setOrderParam] = useState<string>("Alphabetic (asc)");
  const [userInput, setUserInput] = useState<string>("");
  const [filteredList, setFilteredList] = useState<Array<IDiscordGuild>>([
    ...sortByParams({ guilds }, orderParam),
  ]);

  function sortByParams(
    { guilds }: IUserGuildsProps,
    param: string
  ): Array<IDiscordGuild> {
    switch (param) {
      case "Alphabetic (asc)":
        return guilds.sort((a, b) => (a.name > b.name ? 1 : -1));
      case "Members (asc)":
        return guilds.sort((a, b) =>
          a.approximate_member_count > b.approximate_member_count ? 1 : -1
        );
      case "Alphabetic (desc)":
        return guilds.sort((a, b) => (a.name < b.name ? 1 : -1));
      case "Members (desc)":
        return guilds.sort((a, b) =>
          a.approximate_member_count < b.approximate_member_count ? 1 : -1
        );
      default:
        return guilds;
    }
  }

  useEffect(() => {
    setFilteredList((prev) => {
      return [...sortByParams({ guilds: prev }, orderParam)];
    });
  }, [orderParam]);

  useEffect(() => {
    setFilteredList(() => {
      return guilds.filter((guild) => {
        return guild.name
          .toLocaleLowerCase()
          .includes(userInput.toLocaleLowerCase());
      });
    });
  }, [userInput]);

  return (
    <div className="">
      <h5 className="p-5">
        <strong>
          Servidores: <span className="text-green-500">{guilds.length}</span>
        </strong>
      </h5>
      <div>
        <SimpleSelect
          options={[
            "Alphabetic (asc)",
            "Alphabetic (desc)",
            "Members (asc)",
            "Members (desc)",
          ]}
          stateFn={(value) => {
            setOrderParam(value);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className={`grid grid-cols-4 gap-5`}>
        <ListGuilds filteredList={filteredList} />
      </div>
    </div>
  );
}
