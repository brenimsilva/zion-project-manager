import DiscordCenter from "@/components/molecules/DiscordCenter";
import Modal from "@/components/molecules/Modal";
import Navbar from "@/components/organisms/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function discord() {
  const [connected, setConnected] = useState<boolean>(false);
  const route = useRouter();
  useEffect(() => {
    if (!connected) {
      // route.back();
    } else {

    }
  }, [connected])
  return (
    <div>
      {
        !connected && <Modal text="Clique no botao abaixo para realizar o login com sua conta discord" title="Não autorizado!"/>
      }
      <Navbar />
      <DiscordCenter />
    </div>
  );
}
