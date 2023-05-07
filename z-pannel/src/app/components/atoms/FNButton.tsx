"use client";
import React from "react";

export interface IFnButtonProps {
  text: string;
  func: (props?: any) => any;
  btnStyle: string;
}

export default function FNButton({ text, func, btnStyle }: IFnButtonProps) {
  return (
    <React.Fragment>
      <button
        className={btnStyle}
        onClick={() => {
          console.log(process.env);
        }}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
