import React, { useState } from "react";
import FormInput from "../atoms/FormInput";

interface IFormData {
  login: string;
  password: string;
  name: string;
  email: string;
  emailConfirm: string;
}

const defaultFormState: IFormData = {
  login: "",
  name: "",
  password: "",
  email: "",
  emailConfirm: "",
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<IFormData>(defaultFormState);
  return (
    <div className="w-2/5">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-5">
        <div className="col-span-2">
          <FormInput
            text="Login"
            inputType="text"
            getInput={(input) => {
              setFormData({ ...formData, login: input });
            }}
            required
          />
          <FormInput
            text="Password"
            inputType="password"
            getInput={(input) => {
              setFormData({ ...formData, password: input });
            }}
            required
          />
        </div>
        <div className="col-span-2">
          <FormInput
            text="Name"
            inputType="text"
            getInput={(input) => {
              setFormData({ ...formData, name: input });
            }}
            required
          />
        </div>
        <FormInput
          text="Email"
          inputType="email"
          getInput={(input) => {
            setFormData({ ...formData, email: input });
          }}
          required
        />
        <FormInput
          text="Confirm Email"
          inputType="email"
          getInput={(input) => {
            setFormData({ ...formData, emailConfirm: input });
          }}
          required
        />
        <button
          className="col-span-2 bg-cDark hover:bg-cHL transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            console.log(formData);
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
