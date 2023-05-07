import { IGuildContext, guildContext } from "@/app/store/guild-provider";
import React, { useContext, useEffect, useState } from "react";

export interface IGuildProps {
  id: string;
  imageSrc: string;
  name: string;
  approximate_member_count: number;
}

export default function Guild({
  id,
  imageSrc,
  name,
  approximate_member_count,
}: IGuildProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const { addSelectedGuildId, selectedGuildIds, removeSelectedGuildId } =
    useContext(guildContext) as IGuildContext;
  const [divClass, setDivClass] = useState<string>();

  useEffect(() => {
    const twClass =
      "block fadeIn select-none cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
    if (selected) {
      setDivClass(`${twClass} bg-cyan-300 hover:bg-cyan-500`);
    } else {
      setDivClass(twClass);
    }
  }, [selected]);

  useEffect(() => {
    if (selectedGuildIds.includes(id)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedGuildIds]);

  return (
    <div
      className={divClass}
      onClick={() => {
        !selected ? addSelectedGuildId(id) : removeSelectedGuildId(id);
      }}
      // style={{ backgroundColor: selected ? "#67e8f9" : "white" }}
    >
      <div className="grid grid-cols-4">
        {
          <div className="col-span-1">
            {imageSrc.includes("null") ? (
              <div></div>
            ) : (
              <img src={imageSrc} className="border rounded-lg" width="50" />
            )}
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
          <p>
            <strong>Members: </strong>
            {approximate_member_count}
          </p>
        </div>
      </div>
    </div>
  );
}
