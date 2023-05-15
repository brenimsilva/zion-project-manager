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
    <React.Fragment>
      <button
        onClick={pushData}
        className={`bg-transparent hover:bg-cHL text-cHL font-semibold hover:text-white py-2 px-4 border border-cHL hover:border-transparent rounded ${
          disabled ? "cursor-not-allowed hover:bg-cHL" : ""
        }`}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
