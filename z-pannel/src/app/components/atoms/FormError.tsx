import Colors from "@/app/Util/Colors";
import React from "react";
interface props {
  text: string;
  colSpan: number;
}
export default function FormError({ text, colSpan }: props) {
  return (
    <div
      className={`col-span-${colSpan} text-marsHL1 text-xs transition`}
      style={{ filter: `drop-shadow(1px 1px 2px ${Colors.marsHL1})` }}
    >
      <strong>
        <h4>{text}</h4>
      </strong>
    </div>
  );
}
