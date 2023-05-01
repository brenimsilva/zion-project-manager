import React, { useState } from "react";
import { IDiscordGuild } from "@/services/DiscordService";

export interface IGuildProps {
  id: string;
  imageSrc: string;
  name: string;
}

export default function Guild({ id, imageSrc, name }: IGuildProps) {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <div
      key={id}
      className={`block fadeIn select-none cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
        selected ? "bg-cyan-500 hover:bg-cyan-600" : ""
      }`}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <div className="grid grid-cols-4">
        {
          <div className="col-span-1">
            <img src={imageSrc} className="border rounded-lg" width="50" />
          </div>
        }
        <div className="col-span-3">
          <h5 className="">
            <strong>Nome: </strong>
            {name}
          </h5>
          <p>
            <strong>id: </strong>
            {id}
          </p>
        </div>
      </div>
    </div>
  );
}