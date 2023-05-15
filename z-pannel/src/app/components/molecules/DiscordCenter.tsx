"use client";

import React, { useContext, useEffect, useState } from "react";
import UserGuilds from "./UserGuilds";
import Message from "./Message";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import DiscordService from "@/app/services/discord/DiscordService";
import Modal from "./Modal";

export default function DiscordCenter() {
  const [message, setMessage] = useState<any>({ message: "", error: "" });

  return (
    <div className="h-full">
      {/* {!connected && (
        <Modal
          text="Clique no botao abaixo para realizar o login com sua conta discord"
          title="Não autorizado!"
        />
      )} */}
      <div className="msg-box">
        <Message message={message.message} error={message.error} />
      </div>
      <UserGuilds />
    </div>
  );
}
