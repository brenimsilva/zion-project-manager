import React, { useEffect, useState } from "react";
import PlanilhaService from "@/services/PlanilhaService";
import Message from "./Message";
import APIButton from "../atoms/APIButton";
import DiscordService, { IDiscordUser } from "@/services/DiscordService";
import { useRouter } from "next/router";
import UserGuilds from "./UserGuilds";

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

  function discConnection() {}

  function updateNFTValues() {
    PlanilhaService.updateNFTValues().then((response) => {
      setMessage({ message: response.message, error: response.error });
    });
  }

  function updateCryptoValues() {}

  function getDiscordUserInfo() {
    DiscordService.getUserInfo(code as string).then((user) => {
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
    window.location.href =
      "https://discord.com/api/oauth2/authorize?client_id=1102067081115091055&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code&scope=identify%20guilds%20guilds.join";
  }

  return (
    <div className="">
      <div className="msg-box">
        <Message message={message.message} error={message.error} />
      </div>
      <div className="grid grid-cols-2">
        <APIButton pushRequestData={updateNFTValues} text="Update NFT Values" />
        <APIButton
          pushRequestData={updateCryptoValues}
          text="Update Crypto Values"
        />
        <APIButton
          disabled={!connected}
          pushRequestData={getDiscordUserInfo}
          text="Get Discord User Info"
        />
        <APIButton pushRequestData={connect} text="Discord Connect" />
      </div>
      {discordUser && <UserGuilds guilds={discordUser.guilds} />}
    </div>
  );
}
