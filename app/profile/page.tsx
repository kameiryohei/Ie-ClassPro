"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "ユーザー名は1文字以上で入力してください。"),
});

const EditUsername = async (name: string, auth_id: string) => {
  const res = await fetch("/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, auth_id }),
  });
  const data = await res.json();
  return data;
};

const Page = () => {
  const { signOut, session, user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const logout = () => {
    signOut();
    router.push("/");
  };

  const onSubmit = async (data: { name: string }) => {
    if (session?.user?.id) {
      const res = await EditUsername(data.name, session.user.id);
      if (res.message === "Deleted successfully") {
        toast.success("更新しました");
        router.push("/");
      } else {
        toast.error("更新に失敗しました");
      }
    } else {
      console.error("session.user.id is null");
    }
  };

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold mb-5">プロフィール画面</h1>
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg">
        <div className="flex flex-col gap-y-2 text-lg font-semibold">
          <p>ユーザー名：{user?.name}</p>
          <p>登録メールアドレス：{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="py-2">
          <div className="flex justify-center gap-6 py-2">
            <Input
              {...register("name")}
              type="text"
              placeholder="名前を変更する場合は入力してください"
              className="w-1/2 text-center placeholder:text-center placeholder:text-gray-500"
            />
            <Button>更新</Button>
          </div>
          {errors.name && (
            <p className="text-red-600 mt-4">{errors.name.message}</p>
          )}
        </form>

        <div className="mt-5 space-x-12">
          <Button>
            <Link href="/post">自分の過去のレビューを見る</Link>
          </Button>
        </div>

        <div>
          <Button onClick={() => logout()} className="mt-5">
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
