import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService, {
  IDMUser,
} from "@/app/services/datamatrix/user/UserService";

import { z } from "zod";

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

const registerSchema = z
  .object({
    login: z.string().min(4).max(70),
    password: z.string().min(4).max(70),
    passwordConfirm: z.string().min(4).max(70),
    name: z.string().min(2).max(70),
    email: z.string().email().max(70),
    emailConfirm: z.string().email().max(70),
  })
  .strict()
  .refine((data) => data.email === data.emailConfirm, {
    message: "Emails don't match",
    path: ["emailConfirm"],
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
type formData = z.infer<typeof registerSchema>;

async function submitHandler(formData: formData) {
  const result = registerSchema.safeParse(formData);
  if (!result.success) {
    console.log(JSON.parse(result.error));
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(registerSchema),
  });

  function submitData(data: formData) {
    console.log("IT Worked", data);
  }

  return (
    <div className="w-2/5">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-5"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="col-span-2">
          <FormInput
            text="Login"
            inputType="text"
            getInput={{ ...register("login") }}
            required
          />
        </div>
        {errors.login && <span>{errors.login.message}</span>}
        <FormInput
          text="Password"
          inputType="password"
          getInput={{ ...register("password") }}
          required
        />
        <FormInput
          text="Password Confirm"
          inputType="password"
          getInput={{ ...register("passwordConfirm") }}
          required
        />
        <div className="col-span-2">
          <FormInput
            text="Name"
            inputType="text"
            getInput={{ ...register("name") }}
            required
          />
        </div>
        <FormInput
          text="Email"
          inputType="email"
          getInput={{ ...register("email") }}
          required
        />
        <FormInput
          text="Confirm Email"
          inputType="email"
          getInput={{ ...register("emailConfirm") }}
          required
        />
        <button
          className="col-span-2 bg-cDark hover:bg-cHL transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
