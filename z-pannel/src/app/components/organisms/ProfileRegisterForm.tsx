"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IDMProfile, IDMProfileDTO } from "@/app/Util/Interfaces";
import FormInput from "@/app/components/atoms/FormInput";
import ProfileService from "@/app/services/datamatrix/profiles/ProfileService";
import Title from "../atoms/Title";
import Image from "next/image";
import DiscordService from "@/app/services/discord/DiscordService";
import UserService from "@/app/services/datamatrix/user/UserService";
import DataMatrixService from "@/app/services/datamatrix/DataMatrixService";
import AuthService from "@/app/services/datamatrix/auth/AuthService";
import { useRouter, useSearchParams } from "next/navigation";

const registerSchema = z.object({
  username: z.string(),
  discord_username: z.string(),
  discord_id: z.string(),
  discord_email: z.string(),
});

type RegisterSchema = z.infer<typeof registerSchema>;
export default function ProfileRegisterForm() {
  const [message, setMessage] = useState<string>("");
  const [code, setCode] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function submitNewProfile(profile: RegisterSchema) {
    const response = await ProfileService.add({
      ...profile,
      id_user: 1,
      discord_api_token: "",
      discord_avatar: "",
    });
    setMessage(JSON.stringify(response));
    return;
  }

  useEffect(() => {
    console.log(searchParams.get("code"));
    setCode(searchParams.get("code"));
    if (!!code) {
      connectWithDiscord();
    }
  }, [code]);

  async function connectWithDiscord() {
    if (!!code) {
      const access_token = await DiscordService.authenticate(code);
      if (access_token !== false) {
        console.log("Access token granted: ");
        console.log(access_token);

        const user = await DiscordService.getDiscordUserWithGuilds(
          access_token
        );

        console.log("Got a new user");
        console.log(user);

        const newUser: IDMProfileDTO = {
          discord_api_token: access_token,
          discord_avatar: user.avatar,
          discord_email: user.email,
          discord_id: user.id,
          id_user: 16,
          username: user.username,
          discord_username: user.username,
        };
        const response = await ProfileService.add(newUser);
        //@ts-ignore
        if (!!response.error) {
          console.log(response);
          return;
        }
        console.log("User added");
        console.log(response);
      } else {
        console.log("Invalid code, redirecting to discords authentication...");
        router.push(DiscordService.authUrl);
      }
    } else {
      router.push(DiscordService.authUrl);
    }
  }
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        <Title text="Profile Register" />
        <form onSubmit={handleSubmit(submitNewProfile)}>
          <FormInput
            getInput={{ ...register("username") }}
            inputType="text"
            text="Username"
          />
          <FormInput
            getInput={{ ...register("discord_username") }}
            inputType="text"
            text="Discord Username"
          />
          <FormInput
            getInput={{ ...register("discord_email") }}
            inputType="text"
            text="Discord Email"
          />
          <FormInput
            getInput={{ ...register("discord_id") }}
            inputType="text"
            text="Discord Id"
          />
          <button type="submit" className="p-5 border shadow">
            Confirmar
          </button>
        </form>

        <Title text="Or connect with discord" />
        <div className="">
          <button
            type="button"
            onClick={connectWithDiscord}
            className="border shadow p-3 w-full text-cWhite bg-[#5865f2] hover:bg-[#2b3cf3d8] hover:text-white transition"
          >
            <i className="fa-brands fa-discord" />
          </button>
        </div>
      </div>
      <div className="w-fit col-span-1">
        <Image
          src="/bot1.jpg"
          alt="a bot registering"
          width={500}
          height={400}
        />
      </div>
      <strong className="text-cHL2">{message}</strong>
    </div>
  );
}
