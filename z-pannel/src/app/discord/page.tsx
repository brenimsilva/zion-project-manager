"use client";

import DiscordCenter from "../components/molecules/DiscordCenter";
import Modal from "../components/molecules/Modal";
import Navbar from "../components/organisms/Navbar";
import React, { useEffect, useState } from "react";
import DiscordService from "../services/discord/DiscordService";
import { useRouter, useSearchParams } from "next/navigation";
import Config from "../Util/Config";
import GuildProvider from "../store/guild-provider";

export default function discord() {
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
    <GuildProvider>
      <div>
        {!connected && (
          <Modal
            text="Clique no botao abaixo para realizar o login com sua conta discord"
            title="Não autorizado!"
          />
        )}
        <Navbar />
        <DiscordCenter />
      </div>
    </GuildProvider>
  );
}
