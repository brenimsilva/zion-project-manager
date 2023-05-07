import React from "react";

export interface INavTagProps {
  text: string;
  href: string;
}

export default function NavTag({ text, href }: INavTagProps) {
  return (
    <React.Fragment>
      <a
        href={href}
        className="block mt-4 lg:inline-block lg:mt-0 text-violet-200 hover:text-white mr-4"
      >
        {text}
      </a>
    </React.Fragment>
  );
}
