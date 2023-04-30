import React, { useState } from "react";
import PlanilhaService from "@/services/PlanilhaService";
import Message from "./Message";
import APIButton from "../atoms/APIButton";
import DiscordService from "@/services/DiscordService";

export interface IMessage {
  message: string;
  error: string;
}

export default function RequestCenter() {
  const [message, setMessage] = useState<IMessage>({ message: "", error: "" });
  const [data, setData] = useState<Array<Object> | null>();

  function updateNFTValues() {
    PlanilhaService.updateNFTValues().then((response) => {
      setMessage({ message: response.message, error: response.error });
      setData(response.data);
    });
  }

  function updateCryptoValues() {}

  function getDiscordUserInfo() {
    DiscordService.getUserInfo();
  }

  return (
    <div className="">
      <div className="msg-box w-64">
        <Message message={message.message} error={message.error} />
      </div>
      <APIButton pushRequestData={updateNFTValues} text="Update NFT Values" />
      <APIButton
        pushRequestData={updateCryptoValues}
        text="Update Crypto Values"
      />
      <APIButton
        pushRequestData={getDiscordUserInfo}
        text="Get Discord User Info"
      />
    </div>
  );
}
