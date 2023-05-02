import React, { createContext, useState } from "react";

export interface IGuildContext {
  selectedGuildIds: Array<string>;
  addSelectedGuildId: (id: string) => void;
  removeSelectedGuildId: (id: string) => void;
}

export interface IGuildProviderProps {
  children: React.ReactNode;
}

export const guildContext = createContext<IGuildContext>({
  selectedGuildIds: [],
  addSelectedGuildId(id: string) {},
  removeSelectedGuildId(id: string) {},
});

export default function GuildProvider({ children }: IGuildProviderProps) {
  const [selectedGuildIds, setSelectedGuildIds] = useState<Array<string>>([]);

  function addSelectedGuildId(id: string) {
    setSelectedGuildIds((prev) => {
      if (prev.includes(id)) return [...prev];
      return [...prev, id];
    });
    console.log(selectedGuildIds);
  }

  function removeSelectedGuildId(id: string) {
    setSelectedGuildIds((prev) => {
      const newList = prev.filter((item) => {
        return item !== id;
      });
      return newList;
    });
    console.log(selectedGuildIds);
  }

  return (
    <guildContext.Provider
      value={{ selectedGuildIds, addSelectedGuildId, removeSelectedGuildId }}
    >
      {children}
    </guildContext.Provider>
  );
}
