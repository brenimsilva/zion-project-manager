"use client";

import React, { useContext, useState } from "react";
import APIButton from "../atoms/APIButton";
import GuildService from "@/app/services/discord/GuildService";
import UserGuilds from "./UserGuilds";
import Message from "./Message";
import { guildContext } from "@/app/store/guild-provider";
import { IDiscordUser } from "@/app/services/discord/IDiscord";
import { IMessage } from "./RequestCenter";

export default function DiscordCenter() {
  const [message, setMessage] = useState<IMessage>({ message: "", error: "" });
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const { selectedGuildIds } = useContext(guildContext);

  function getDiscordUserInfo() {
    GuildService.getUserData().then((user) => {
      setDiscordUser(user);
    });
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
