"use client";
import Colors from "@/app/Util/Colors";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface ISBItem {
  href: string;
  icon: string;
}

export interface ISelected {
  selected: boolean;
}
const IContainer = styled.div`
  /* background-color: ${(props: ISelected) =>
    props.selected ? "red" : "blue"}; */
`;
export default function SBItem({ href, icon }: ISBItem) {
  const route = usePathname();
  const selected = route === href;
  const router = useRouter();

  return (
    <div
      className="p-1 my-1 rounded rounded-xl"
      style={
        selected
          ? {
              border: `1px solid ${Colors.marsWhite}`,
              boxShadow: `0px 0px 3px #00000028`,
            }
          : {}
      }
    >
      <div
        className="flex justify-center rounded rounded-xl hover:text-marsHL1 transition-all duration-200"
        style={
          selected
            ? { backgroundColor: Colors.marsWhite, color: Colors.marsHL1 }
            : {}
        }
      >
        <a
          onClick={() => {
            router.push(href);
          }}
          className="col-span-1 text-center grid cursor-pointer"
        >
          <span className="flex my-2 items-center">
            <i className={icon}></i>
          </span>
        </a>
      </div>
    </div>
  );
}
