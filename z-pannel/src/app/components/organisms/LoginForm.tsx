"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "../atoms/Title";
import FormInput from "../atoms/FormInput";
import AuthService from "@/app/services/datamatrix/auth/AuthService";

const loginSchema = z.object({
  login: z.string().min(4).max(70),
  password: z.string().min(4).max(70),
  remember: z.boolean().default(false),
});

type loginType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  const [response, setResponse] = useState();

  async function submitLogin(data: loginType) {
    const response = await AuthService.auth({
      login: data.login,
      password: data.password,
    });
    console.log(response);
    setResponse(response.data);
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitLogin)}
        className="shadow shadow-xl p-10"
      >
        <FormInput text="Login" inputType="text" getInput={register("login")} />
        <FormInput
          inputType="password"
          text="Password"
          getInput={register("password")}
        />
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-1">
            <input type="checkbox" className="" />
            <p className="text-xs text-center">Remember-me</p>
          </div>
          <a className="text-sm" href="#">
            Forgot your password?
          </a>
        </div>
        <button className="bg-cDark hover:bg-cHL text-cWhite p-2 w-full mt-10">
          Sign in
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          AuthService.teste(response);
        }}
      >
        Teste
      </button>
    </div>
  );
}
