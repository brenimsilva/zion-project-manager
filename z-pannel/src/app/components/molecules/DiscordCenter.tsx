"use client";

import React, { useContext, useEffect, useState } from "react";
import APIButton from "../atoms/APIButton";
import GuildService from "@/app/services/discord/GuildService";
import UserGuilds from "./UserGuilds";
import Message from "./Message";
import { guildContext } from "@/app/store/guild-provider";
import { IDiscordUser } from "@/app/services/discord/IDiscord";
import { IMessage } from "./RequestCenter";
import Config from "@/app/Util/Config";

export default function DiscordCenter() {
  const [message, setMessage] = useState<IMessage>({ message: "", error: "" });
  const [connected, setConnected] = useState<boolean>(false);
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const { selectedGuildIds } = useContext(guildContext);

  function getDiscordUserInfo() {
    GuildService.getGuilds().then((user) => {
      setDiscordUser(user);
    });
  }

  function connect() {
    const url = `https://discord.com/api/oauth2/authorize?client_id=1102067081115091055&redirect_uri=http%3A%2F%2F${Config.APP_HOST}%3A${Config.APP_PORT}%2Fdiscord&response_type=code&scope=identify%20guilds%20guilds.members.read%20guilds.join%20gdm.join%20connections%20email`;
    window.location.href = url;
  }

  return (
    <div className="">
      <div className="msg-box">
        <Message message={message.message} error={message.error} />
      </div>
      <div className="grid grid-cols-2">
        <APIButton
          pushRequestData={getDiscordUserInfo}
          text="Get Discord User Info"
        />
        <APIButton
          text="Leave Guilds"
          pushRequestData={() => {
            GuildService.leaveGuilds(selectedGuildIds).then(() => {
              getDiscordUserInfo();
            });
          }}
        />
      </div>
      {discordUser && <UserGuilds guilds={discordUser.guilds} />}
    </div>
  );
}
