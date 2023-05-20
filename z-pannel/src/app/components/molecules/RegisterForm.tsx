import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService, {
  IDMUser,
} from "@/app/services/datamatrix/user/UserService";

import { z } from "zod";
import FormError from "../atoms/FormError";

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

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(registerSchema),
  });

  function submitData(data: formData) {
    const body: IDMUser = {
      id: 0,
      email: data.email,
      login: data.login,
      name: data.name,
      password: data.password,
    };
    UserService.add(body).then((response) => {
      console.log(response);
    });
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
        {errors.login && <FormError text={errors.login.message!} colSpan={2} />}
        <div className="grid grid-cols-2 gap-5 col-span-2">
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
        </div>
        <div className="grid grid-cols-2 gap-5 col-span-2">
          {errors.password && (
            <FormError text={errors.password.message!} colSpan={1} />
          )}
          {errors.passwordConfirm && (
            <FormError text={errors.passwordConfirm.message!} colSpan={1} />
          )}
        </div>
        <div className="col-span-2">
          <FormInput
            text="Name"
            inputType="text"
            getInput={{ ...register("name") }}
            required
          />
        </div>
        {errors.name && <FormError text={errors.name.message!} colSpan={2} />}
        <div className="grid grid-cols-2 gap-5 col-span-2">
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
        </div>
        <div className="grid grid-cols-2 gap-5 col-span-2">
          {errors.email && (
            <FormError text={errors.email.message!} colSpan={1} />
          )}
          {errors.emailConfirm && (
            <FormError text={errors.emailConfirm.message!} colSpan={1} />
          )}
        </div>

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
