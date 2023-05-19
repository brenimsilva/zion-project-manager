import Colors from "@/app/Util/Colors";
import React from "react";

interface FormInputProps {
  text: string;
  inputType: string;
  getInput: any;
  required?: boolean;
}

export default function FormInput({
  text,
  inputType,
  required,
  getInput,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-cBG text-sm font-bold mb-2"
        htmlFor={text}
        style={{}}
      >
        {text}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-gray-500"
        id={text}
        type={inputType}
        placeholder={text}
        required={required}
        {...getInput}
      />
    </div>
  );
}
