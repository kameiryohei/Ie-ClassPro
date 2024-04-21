"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "@/app/hooks/useUser";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const RegisterPage = () => {
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

  const doRegister: SubmitHandler<{ email: string; password: string }> = async (
    formData
  ) => {
    try {
      await signUp({ email: formData.email, password: formData.password });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
  };

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-40 text-center lg:pt-32">
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg ring-1 ring-gray-400">
        <p className="text-2xl text-center text-gray-900">新規登録画面</p>
        <div className="flex justify-center pt-8">
          <form onSubmit={handleSubmit(doRegister)} className="w-full max-w-md">
            <div className="mb-4">
              <Input
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
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              {errors.email && (
                <div className="text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Input
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
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
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
            >
              新規登録する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
