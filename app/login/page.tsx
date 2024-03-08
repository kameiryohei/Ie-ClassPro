import React from "react";
import AuthForm from "./components/AuthForm";

const page = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 h-full ">
      <div className="sm:mx-auto sm:auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          お持ちのアカウントでログインしてください
        </h2>
        <AuthForm />
      </div>
    </div>
  );
};
export default page;
