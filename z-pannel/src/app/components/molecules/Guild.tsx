import { IGuildContext, guildContext } from "@/app/store/guild-provider";
import React, { useContext } from "react";
import styled from "styled-components";

export interface IGuildProps {
  id: string;
  imageSrc: string;
  name: string;
  approximate_member_count: number;
  selected: boolean;
}

const twClass =
  "block fadeIn select-none cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800";

interface ICard {
  selected: boolean;
}

const Card = styled.div`
  display: block;
  user-select: none;
  cursor: pointer;
  max-width: 384px;
  padding: 24px;
  background-color: ${(props: ICard) => (props.selected ? "#67e8f9" : "white")};
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  &:hover {
    background-color: ${(props: ICard) =>
      props.selected ? "#06b6d4" : "#f3f4f6"};
  }
`;

export default function Guild({
  id,
  imageSrc,
  name,
  approximate_member_count,
  selected,
}: IGuildProps) {
  const { addSelectedGuildId, removeSelectedGuildId } = useContext(
    guildContext
  ) as IGuildContext;

  return (
    <Card
      className={"fadeIn"}
      selected={selected}
      onClick={() => {
        !selected ? addSelectedGuildId(id) : removeSelectedGuildId(id);
      }}
    >
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          {imageSrc.includes("null") ? (
            <div></div>
          ) : (
            <img src={imageSrc} className="border rounded-lg" width="50" />
          )}
        </div>

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
    </Card>
  );
}
