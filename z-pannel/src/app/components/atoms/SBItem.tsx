"use client";
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
      className={`flex justify-center  
      hover:bg-${selected ? "gray" : "cyan"}-500 rounded-xl 
      bg-${selected ? "cyan" : "red"}-300`}
    >
      <a href={href} className="col-span-1 text-center grid">
        <span className="flex my-2 items-center">
          <i className={icon}></i>
        </span>
      </a>
    </div>
  );
}
