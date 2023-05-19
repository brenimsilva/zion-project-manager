import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import UserService, {
  IDMUser,
} from "@/app/services/datamatrix/user/UserService";

interface IFormData {
  login: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  emailConfirm: string;
}

const defaultFormState: IFormData = {
  login: "",
  name: "",
  password: "",
  passwordConfirm: "",
  email: "",
  emailConfirm: "",
};

async function submitHandler(formData: IFormData) {
  if (formData.email !== formData.emailConfirm) {
    return { errors: { email: "Email must be the same of Email Confirm" } };
  }
  if (formData.password !== formData.passwordConfirm) {
    return {
      errors: { password: "Password must be the same of Password Confirm" },
    };
  }
  const response = await UserService.add({
    id: 0,
    email: formData.email,
    login: formData.login,
    name: formData.name,
    password: formData.password,
  });

  return response;
}

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
        </div>
        <FormInput
          text="Password"
          inputType="password"
          getInput={(input) => {
            setFormData({ ...formData, password: input });
          }}
          required
        />
        <FormInput
          text="Password Confirm"
          inputType="password"
          getInput={(input) => {
            setFormData({ ...formData, passwordConfirm: input });
          }}
          required
        />
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
          onClick={async () => {
            const response = await submitHandler(formData);
            if (response.errors) {
              console.log(response.errors);
              return;
            }
            console.log(response);
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
