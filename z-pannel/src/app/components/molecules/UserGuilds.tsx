import React, { useContext, useEffect, useRef, useState } from "react";
import SimpleSelect from "../atoms/SimpleSelect";
import ListGuilds from "./ListGuilds";
import SimpleInput from "../atoms/SimpleInput";
import APIButton from "../atoms/APIButton";
import GuildService from "@/app/services/discord/GuildService";
import { guildContext } from "@/app/store/guild-provider";
import { useRouter, useSearchParams } from "next/navigation";
import Title from "../atoms/Title";
import { IDiscordGuild, IDiscordUser } from "@/app/Util/Interfaces";
import DiscordService from "@/app/services/discord/DiscordService";
import ProfileService from "@/app/services/datamatrix/profiles/ProfileService";

export interface IUserGuildsProps {
  guilds: Array<IDiscordGuild>;
}

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

export default function UserGuilds() {
  const [orderParam, setOrderParam] = useState<string>("Alphabetic (asc)");
  const [userInput, setUserInput] = useState<string>("");
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const [filteredList, setFilteredList] = useState<Array<IDiscordGuild>>([]);
  const { selectedGuildIds } = useContext(guildContext);
  const [connected, setConnected] = useState<boolean>(true);
  const router = useRouter();
  const code = useSearchParams().get("code");
  async function getDiscordUserInfo() {
    const { discord_api_token } = await ProfileService.getById(7);
    const user = await DiscordService.getDiscordUserWithGuilds(
      discord_api_token
    );
    setDiscordUser(user);
    setFilteredList(user.guilds!);
  }

  useEffect(() => {
    setFilteredList((prev) => {
      return [...sortByParams({ guilds: prev }, orderParam)];
    });
  }, [orderParam]);

  useEffect(() => {
    if (discordUser) {
      setFilteredList((prev) => {
        return discordUser!.guilds!.filter((guild) => {
          return guild.name
            .toLocaleLowerCase()
            .includes(userInput.toLocaleLowerCase());
        });
      });
    }
  }, [userInput]);

  return (
    <div className="">
      <h5 className="py-5">
        <strong>
          Servidores:
          {discordUser && (
            <span className="text-green-500 mx-1">
              {discordUser!.guilds!.length}
            </span>
          )}
        </strong>
      </h5>
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white p-5 mb-10 rounded rounded-xl shadow flex flex-col justify-center">
          <Title text="Search Actions" />
          <div className="my-2">
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
          </div>
          <div className="my-2">
            <SimpleInput
              stateFn={(value) => {
                setUserInput(value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center-col bg-white p-5 mb-10 rounded rounded-xl shadow gap-5 ">
          <Title text="Guild Actions" />
          <APIButton
            pushRequestData={getDiscordUserInfo}
            text="Get Discord User Info"
          />
          <APIButton
            text="Leave Guilds"
            disabled={true}
            pushRequestData={() => {
              GuildService.leaveGuilds(selectedGuildIds).then(() => {
                getDiscordUserInfo();
              });
            }}
          />
        </div>
      </div>
      <div
        className="scrollbar scrollbar-thin scroll-smooth overflow-auto border rounded rounded-xl p-5 shadow-sm"
        style={{ maxHeight: "25rem", minHeight: "25rem" }}
      >
        <div className="grid grid-cols-4 gap-5 ">
          {filteredList && <ListGuilds filteredList={filteredList} />}
        </div>
      </div>
    </div>
  );
}
