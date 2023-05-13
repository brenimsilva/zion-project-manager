import React from "react";

export interface ISBItem {
  text: string;
  href: string;
  icon: string;
}

export default function SBItem({ text, href, icon }: ISBItem) {
  // const route = useRouter();
  return (
    <div className="grid grid-cols-5 gap-0">
      <i className={`${icon} col-span-1 text-center`}></i>
      <a href={href} className="col-span-4">
        {text}
      </a>
    </div>
  );
}
