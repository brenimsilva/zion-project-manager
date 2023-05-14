"use client";
import Colors from "@/app/Util/Colors";
import { usePathname } from "next/navigation";
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

  return (
    <div
      className="p-1 my-1 rounded rounded-xl"
      style={
        selected
          ? {
              border: `1px solid ${Colors.cWhite}`,
              boxShadow: `0px 0px 3px #00000028`,
            }
          : {}
      }
    >
      <div
        className="flex justify-center rounded rounded-xl hover:text-cHL transition-all duration-200"
        style={
          selected ? { backgroundColor: Colors.cWhite, color: Colors.cHL } : {}
        }
      >
        <a href={href} className="col-span-1 text-center grid">
          <span className="flex my-2 items-center">
            <i className={icon}></i>
          </span>
        </a>
      </div>
    </div>
  );
}
