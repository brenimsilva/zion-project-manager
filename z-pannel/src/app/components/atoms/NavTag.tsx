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
        className="block mt-4 lg:inline-block lg:mt-0 text-cHL hover:text-white mr-4 transition-all duration-200"
      >
        {text}
      </a>
    </React.Fragment>
  );
}
