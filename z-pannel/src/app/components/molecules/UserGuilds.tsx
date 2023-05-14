import React, { useEffect, useRef, useState } from "react";
import Guild from "./Guild";
import { IDiscordGuild } from "@/app/services/discord/IDiscord";
import SimpleSelect from "../atoms/SimpleSelect";
import ListGuilds from "./ListGuilds";
import SimpleInput from "../atoms/SimpleInput";

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
      <h5 className="py-5">
        <strong>
          Servidores: <span className="text-green-500">{guilds.length}</span>
        </strong>
      </h5>
      <div className="">
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
        <SimpleInput
          stateFn={(value) => {
            setUserInput(value);
          }}
        />
      </div>
      <div className="overflow-auto" style={{ maxHeight: "35rem" }}>
        <div className="grid grid-cols-4 gap-5">
          <ListGuilds filteredList={filteredList} />
        </div>
      </div>
    </div>
  );
}
