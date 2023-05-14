import React from "react";

interface TButtonProps {
  textColor: string;
  borderColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  text: string;
}

export default function TButton({
  textColor,
  borderColor,
  hoverBorderColor,
  hoverTextColor,
  text,
}: TButtonProps) {
  return (
    <React.Fragment>
      <button
        className={`flex items-center px-3 py-2 border rounded text-${textColor} border-${borderColor} hover:text-${hoverTextColor} hover:border-${hoverBorderColor}`}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
