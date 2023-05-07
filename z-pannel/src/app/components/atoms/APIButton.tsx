import React, { useEffect, useState } from "react";
export interface IButton {
  text: string;
  pushRequestData: () => void;
  disabled?: boolean;
}
export default function APIButton({
  text,
  pushRequestData,
  disabled,
}: IButton) {
  function pushData() {
    if (disabled) {
      return;
    }
    pushRequestData();
  }
  return (
    <div className="grid">
      <button
        onClick={pushData}
        className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
          disabled ? "cursor-not-allowed hover:bg-blue-100" : ""
        }`}
      >
        {text}
      </button>
    </div>
  );
}
