"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface TButtonProps {
  textColor: string;
  borderColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  text: string;
  route: string;
}

export default function RouteButton({
  textColor,
  borderColor,
  hoverBorderColor,
  hoverTextColor,
  text,
  route,
}: TButtonProps) {
  const router = useRouter();
  return (
    <React.Fragment>
      <button
        className={`transition flex items-center px-3 py-2 border rounded text-${textColor} border-${borderColor} hover:text-${hoverTextColor} hover:border-${hoverBorderColor}`}
        onClick={() => router.push(route)}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
