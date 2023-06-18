"use client";
import React, { useEffect, useState } from "react";
import ProfileService from "../../services/datamatrix/profiles/ProfileService";
import { usePathname, useSearchParams } from "next/navigation";
import DiscordService from "../../services/discord/DiscordService";
import { useRouter } from "next/navigation";

export default function page() {
  const path = useSearchParams();
  const [code, setCode] = useState<string>();
  const [accessToken, setAccessToken] = useState();
  const router = useRouter();

  useEffect(() => {
    if (path.has("code")) {
      setCode(path.get("code"));
    }
  }, [path]);

  return (
    <div>
      <button
        className="border p-10 shadow"
        onClick={() => {
          ProfileService.getById(7).then((profile) => {
            console.log(profile);
            console.log("Fazendo update do user");
            if (!!profile.discord_api_token) {
              setAccessToken(profile.discord_api_token);
            }
            const newProfile = {
              ...profile,
              discord_api_token: accessToken,
            };
            console.log(newProfile);
            ProfileService.updateProfile(newProfile);
          });
        }}
      >
        Atualizar User
      </button>
      <button
        className="border p-10 shadow"
        onClick={() => {
          if (!!code) {
            DiscordService.authenticate(code).then((access_token) => {
              console.log(access_token);
              setAccessToken(access_token);
              return;
            });
          } else {
            router.push(DiscordService.authUrl);
          }
        }}
      >
        Get Discord Token
      </button>

      <div>
        <p>
          <strong>Code: </strong> {code && code}{" "}
        </p>
        <p>
          <strong>Auth_Token: </strong> {accessToken && accessToken}
        </p>
      </div>
    </div>
  );
}
