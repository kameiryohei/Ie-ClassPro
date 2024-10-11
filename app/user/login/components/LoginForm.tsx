"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useUser from "app/hooks/useUser";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
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
  const { signIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const doLogin: SubmitHandler<{ email: string; password: string }> = async (
    formData
  ) => {
    try {
      setLoading(true);
      const { error } = await signIn({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        // エラー時の処理
        toast.error("メールアドレス、もしくはパスワードが違います");
        setLoading(false);
      } else {
        // 成功時の処理
        toast.success("ログインしました");
        router.push("/");
        setLoading(false);
      }
    } catch (error) {
      toast.error("予期せぬエラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(doLogin)} className="w-full max-w-md">
      <div className="mb-4">
        <Input
          id="email"
          placeholder="メールアドレス"
          disabled={loading}
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
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-4">
        <Input
          id="password"
          type="password"
          disabled={loading}
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
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
      </div>

      <button
        type="submit"
        className={`text-white px-4 py-2 rounded-md focus:outline-none ${
          loading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600 transition-colors duration-300 focus:border-blue-500 focus:ring"
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <p>ログイン中・・・</p>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          </div>
        ) : (
          "ログイン"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
