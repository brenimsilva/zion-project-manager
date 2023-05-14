"use client";
import React from "react";
import APIButton from "../components/atoms/APIButton";
import CyberSheetService from "../services/cybersheet/CyberSheetService";

export default function page() {
  return (
    <div className="">
      <h1>asd</h1>
      <APIButton
        text="cybersheet"
        pushRequestData={() => {
          CyberSheetService.updateCryptoValues().then((data) => {
            console.log(data);
          });
          // CyberSheetService.updateNFTValues().then((data) => console.log(data));
        }}
      />
    </div>
  );
}
