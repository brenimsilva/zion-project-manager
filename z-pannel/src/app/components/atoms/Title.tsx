import React from "react";

interface ITitleProps {
  text: string;
  color?: string;
}

export default function Title({ text, color }: ITitleProps) {
  return (
    <React.Fragment>
      <h1
        className={`mb-1 text-4xl text-center font-extrabold leading-none tracking-tight text-${color ? color : 'gray-900'} md:text-5xl lg:text-4xl dark:text-white`}
      >
        {text}
      </h1>
    </React.Fragment>
  );
}
