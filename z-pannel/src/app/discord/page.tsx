"use client";

import DiscordCenter from "../components/molecules/DiscordCenter";
import Modal from "../components/molecules/Modal";
import Navbar from "../components/organisms/Navbar";
import React, { useEffect, useState } from "react";
import DiscordService from "../services/discord/DiscordService";
import { useRouter, useSearchParams } from "next/navigation";

export default function discord() {
  const router = useRouter();
  const code = useSearchParams().get("code");
  useEffect(() => {
    if (code) {
      DiscordService.authenticate(code as string).then((auth: boolean) => {
        setConnected(auth);
      });
    }
  }, [code]);
  const [connected, setConnected] = useState<boolean>(false);

  return (
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
  );
}
