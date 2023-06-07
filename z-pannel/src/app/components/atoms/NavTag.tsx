import { useRouter } from "next/navigation";
import React from "react";

export interface INavTagProps {
  text: string;
  href: string;
}

export default function NavTag({ text, href }: INavTagProps) {
  const router = useRouter();
  return (
    <React.Fragment>
      <a
        onClick={() => router.push(href)}
        className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-marsWhite hover:text-white mr-4 transition-all duration-200"
      >
        {text}
      </a>
    </React.Fragment>
  );
}
