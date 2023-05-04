import React, { useContext, useEffect, useState } from "react";
import CyberSheetService from "@/services/cybersheet/CyberSheetService";
import Message from "./Message";
import APIButton from "../atoms/APIButton";
import { useRouter } from "next/router";
import UserGuilds from "./UserGuilds";
import Config from "@/Util/Config";
import GuildService from "@/services/discord/GuildService";
import { guildContext } from "@/store/guild-provider";
import { IDiscordUser } from "@/interfaces/IDiscord";
import DiscordService from "@/services/discord/DiscordService";

export interface IMessage {
  message: string;
  error: string;
}

export default function RequestCenter() {
  const [message, setMessage] = useState<IMessage>({ message: "", error: "" });
  const [connected, setConnected] = useState<boolean>(false);
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const router = useRouter();
  const { code } = router.query;
  const { selectedGuildIds } = useContext(guildContext);

  function discConnection() {}

  function updateNFTValues() {
    CyberSheetService.updateNFTValues().then((response) => {
      setMessage({ message: response.message, error: response.error });
    });
  }

  function updateCryptoValues() {}

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
    const url = `https://discord.com/api/oauth2/authorize?client_id=1102067081115091055&redirect_uri=http%3A%2F%2F${Config.APP_HOST}%3A${Config.APP_PORT}%2Fdashboard&response_type=code&scope=identify%20connections%20guilds.join%20gdm.join%20guilds.members.read%20guilds`;
    window.location.href = url;
  }

  return (
    <div className="">
      <div className="msg-box">
        <Message message={message.message} error={message.error} />
      </div>
      <div className="grid grid-cols-2">
        <APIButton pushRequestData={updateNFTValues} text="Update NFT Values" />
        <APIButton
          pushRequestData={() => CyberSheetService.updateCryptoValues()}
          text="Update Crypto Values"
        />
        <APIButton
          disabled={!connected}
          pushRequestData={getDiscordUserInfo}
          text="Get Discord User Info"
        />
        <APIButton pushRequestData={connect} text="Discord Connect" />
        <APIButton
          text="LEAVE GUILDS"
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
