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
        className={`bg-transparent hover:bg-marsHL1 text-marsHL1 font-semibold hover:text-white py-2 px-4 border border-marsHL1 hover:border-transparent rounded ${
          disabled ? "cursor-not-allowed hover:bg-marsHL1" : ""
        }`}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
