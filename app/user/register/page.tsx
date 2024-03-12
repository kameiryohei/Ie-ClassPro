"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "@/app/hooks/useUser";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signUp } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const doRegister: SubmitHandler<{ email: string; password: string }> = async (
    formData
  ) => {
    setLoading(true);
    try {
      await signUp({ email: formData.email, password: formData.password });
      setLoading(false);
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(doRegister)} className="w-full max-w-md">
        <div className="mb-4">
          <input
            id="email"
            placeholder="メールアドレス"
            {...register("email", {
              required: {
                value: true,
                message: "メールアドレスを入力してください",
              },
              pattern: {
                value:
                  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                message: "有効なメールアドレスを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            id="password"
            type="password"
            placeholder="パスワード"
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください",
              },
              minLength: {
                value: 6,
                message: "パスワードは6文字以上にしてください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          disabled={loading}
        >
          {loading ? "登録中..." : "新規アカウント作成"}
        </button>
      </form>
    </div>
  );
};

export default Register;
