"use client";

import React, { useContext, useEffect, useState } from "react";
import APIButton from "../atoms/APIButton";
import GuildService from "@/app/services/discord/GuildService";
import UserGuilds from "./UserGuilds";
import Message from "./Message";
import { guildContext } from "@/app/store/guild-provider";
import { IDiscordUser } from "@/app/services/discord/IDiscord";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import DiscordService from "@/app/services/discord/DiscordService";
import Modal from "./Modal";
import Config from "@/app/Util/Config";

export default function DiscordCenter() {
  const [message, setMessage] = useState<any>({ message: "", error: "" });
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const { selectedGuildIds } = useContext(guildContext);

  function getDiscordUserInfo() {
    GuildService.getUserData().then((user) => {
      setDiscordUser(user);
    });
  }

  const router = useRouter();
  const code = useSearchParams().get("code");
  const [connected, setConnected] = useState<boolean>(false);
  useEffect(() => {
    if (!localStorage.getItem("access_token") && !code) {
      setConnected(false);
      const url = `https://discord.com/api/oauth2/authorize?client_id=1102067081115091055&redirect_uri=http%3A%2F%2F${Config.APP_HOST}%3A${Config.APP_PORT}%2Fdiscord&response_type=code&scope=identify%20guilds%20guilds.members.read%20guilds.join%20gdm.join%20connections%20email`;
      router.push(url);
    } else if (code && !localStorage.getItem("access_token")) {
      DiscordService.authenticate(code).then((auth) => {
        setConnected(auth);
      });
    } else {
      setConnected(true);
    }
  }, []);

  return (
    <div className="h-full">
      {!connected && (
        <Modal
          text="Clique no botao abaixo para realizar o login com sua conta discord"
          title="Não autorizado!"
        />
      )}
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
