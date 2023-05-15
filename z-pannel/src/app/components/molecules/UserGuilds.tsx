import React, { useContext, useEffect, useRef, useState } from "react";
import Guild from "./Guild";
import { IDiscordGuild, IDiscordUser } from "@/app/services/discord/IDiscord";
import SimpleSelect from "../atoms/SimpleSelect";
import ListGuilds from "./ListGuilds";
import SimpleInput from "../atoms/SimpleInput";
import APIButton from "../atoms/APIButton";
import GuildService from "@/app/services/discord/GuildService";
import { guildContext } from "@/app/store/guild-provider";
import Config from "@/app/Util/Config";
import DiscordService from "@/app/services/discord/DiscordService";
import { useRouter, useSearchParams } from "next/navigation";

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
  function getDiscordUserInfo() {
    GuildService.getUserData().then((user) => {
      if (connected) {
        setDiscordUser(user);
        setFilteredList(user.guilds);
      }
    });
  }

  // useEffect(() => {
  //   if (!code && !connected) {
  //     router.push(DiscordService.authUrl);
  //   } else if (code && !connected) {
  //     DiscordService.authenticate(code).then((auth) => {
  //       setConnected(auth);
  //     });
  //   }
  // }, [code]);

  useEffect(() => {
    setFilteredList((prev) => {
      return [...sortByParams({ guilds: prev }, orderParam)];
    });
  }, [orderParam]);

  useEffect(() => {
    if (discordUser) {
      setFilteredList(() => {
        return discordUser.guilds.filter((guild) => {
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
          Servidores:{" "}
          {discordUser && (
            <span className="text-green-500">{discordUser.guilds.length}</span>
          )}
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
      <div className="grid grid-cols-2 gap-5">
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
      <div
        className="scrollbar scrollbar-thin scroll-smooth overflow-auto "
        style={{ maxHeight: "35rem" }}
      >
        <div className="grid grid-cols-4 gap-5">
          {filteredList && <ListGuilds filteredList={filteredList} />}
        </div>
      </div>
    </div>
  );
}
