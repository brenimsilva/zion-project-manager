import React from "react";

export interface ISBItem {
  href: string;
  icon: string;
}

export default function SBItem({ href, icon }: ISBItem) {
  // const route = useRouter();
  return (
    <div className="flex justify-center  hover:bg-cyan-500 rounded-xl">
      <a href={href} className="col-span-1 text-center grid">
        <span className="flex my-2 items-center">
          <i className={`${icon} `}></i>
        </span>
      </a>
    </div>
  );
}
