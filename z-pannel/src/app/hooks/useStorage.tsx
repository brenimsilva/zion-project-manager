import React from "react";
interface props {
  key: string;
  value: string;
}
export default function useStorage({ key, value }: props) {
  localStorage.setItem(key, value);
  return localStorage.getItem(key);
}
