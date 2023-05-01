import React, { createContext, useState } from "react";

export interface IGuildContext {
  selectedGuildIds: Array<string>;
  addSelectedGuildId: (id: string) => void;
}

export interface IGuildProviderProps {
  children: React.ReactNode;
}

export const guildContext = createContext<IGuildContext>({
  selectedGuildIds: [],
  addSelectedGuildId(id: string) {},
});

export default function GuildProvider({ children }: IGuildProviderProps) {
  const [selectedGuildIds, setSelectedGuildIds] = useState<Array<string>>([]);
  function addSelectedGuildId(id: string) {
    setSelectedGuildIds((prev) => {
      return [...prev, id];
    });
    console.log(selectedGuildIds);
  }
  return (
    <guildContext.Provider value={{ selectedGuildIds, addSelectedGuildId }}>
      {children}
    </guildContext.Provider>
  );
}
