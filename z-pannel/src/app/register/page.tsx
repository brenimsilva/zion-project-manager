import React from "react";
import Title from "../components/atoms/Title";
import RegisterForm from "../components/organisms/RegisterForm";

export default function page() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Title text="Register" />
      <RegisterForm />
    </div>
  );
}
