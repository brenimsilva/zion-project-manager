import React from 'react'

interface FormInputProps {
    text: string;
    inputType: string;

}

export default function FormInput({text, inputType}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={text}>
        {text}
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-red-500" id="username" type={inputType} placeholder={text} />
    </div>
  )
}
