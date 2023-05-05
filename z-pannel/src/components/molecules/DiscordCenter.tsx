import React, { useContext, useEffect, useState } from "react";
import APIButton from "../atoms/APIButton";
import CyberSheetService from "@/services/cybersheet/CyberSheetService";
import GuildService from "@/services/discord/GuildService";
import UserGuilds from "./UserGuilds";
import Message from "./Message";
import DiscordService from "@/services/discord/DiscordService";
import { guildContext } from "@/store/guild-provider";
import { useRouter } from "next/router";
import { IDiscordUser } from "@/interfaces/IDiscord";
import { IMessage } from "./RequestCenter";
import Config from "@/Util/Config";

export default function DiscordCenter() {
  const [message, setMessage] = useState<IMessage>({ message: "", error: "" });
  const [connected, setConnected] = useState<boolean>(false);
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const router = useRouter();
  const { code } = router.query;
  const { selectedGuildIds } = useContext(guildContext);

  function getDiscordUserInfo() {
    GuildService.getGuilds().then((user) => {
      setDiscordUser(user);
    });
  }

  useEffect(() => {
    if (code) {
      DiscordService.authenticate(code as string).then((auth: boolean) => {
        setConnected(auth);
      });
    }
  }, [code]);

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
          disabled={!connected}
          pushRequestData={getDiscordUserInfo}
          text="Get Discord User Info"
        />
        <APIButton pushRequestData={connect} text="Discord Connect" />
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
