import React from "react";

interface ISelectProps {
  options: Array<string>;
  stateFn: (value: string) => void;
}

export default function SimpleSelect({ options, stateFn }: ISelectProps) {
  return (
    <div>
      <select
        onChange={(e) => {
          stateFn(e.target.value);
        }}
      >
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
}
