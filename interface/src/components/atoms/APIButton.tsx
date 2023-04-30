import React from "react";
export interface IButton {
  text: string;
  pushRequestData: () => void;
}
export default function APIButton({ text, pushRequestData }: IButton) {
  return (
    <div>
      <button
        onClick={pushRequestData}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {text}
      </button>
    </div>
  );
}
