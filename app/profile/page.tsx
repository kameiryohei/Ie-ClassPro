"use client";
import { Button } from "@/components/ui/button";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { signOut, user } = useUser();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold mb-5">プロフィール画面</h1>
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg">
        <div className="flex flex-col gap-y-2 text-lg font-medium">
          <p>ユーザー名：{user?.name}</p>
          <p>登録メールアドレス：{user?.email}</p>
          <p>所属大学名：{user?.university}</p>
          <p>学部名：{user?.faculty}</p>
          <p>学科名：{user?.department}</p>
          <p>学年：{user?.grade}年</p>
        </div>
        <div>
          <Button>
            <Link href="/profile/edit">プロフィールを編集する</Link>
          </Button>
        </div>

        <div className="mt-5 space-x-12">
          <Button>
            <Link href="/post">自分の過去のレビューを見る</Link>
          </Button>
        </div>

        <div>
          <Button onClick={logout} className="mt-5">
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
