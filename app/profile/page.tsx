"use client";
import { Button } from "@/components/ui/button";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const { signOut, user, error, isLoading } = useUser();
  const router = useRouter();
  const id = user?.id;

  const logOut = () => {
    signOut();
    toast.success("ログアウトしました");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold mb-5">プロフィール画面</h1>
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg ring-1 ring-gray-400">
        {isLoading ? (
          <>
            <p className="text-center text-lg">読み込み中・・・</p>
            <ClipLoader color="#ff7800" size={50} className="mx-auto my-8" />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-y-2 text-lg font-medium">
              <p>ユーザー名：{user?.name}</p>
              <p>登録メールアドレス：{user?.email}</p>
              <p>所属学校名：{user?.university}</p>
              <p>学部名：{user?.faculty}</p>
              <p>学科名：{user?.department}</p>
              <p>学年：{user?.grade}年</p>
            </div>
          </>
        )}

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
        <div className="mt-5">
          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 duration-200 rounded-xl">
            <Link href={`/create/editplan/${id}`}>
              過去のプランを編集・削除
            </Link>
          </button>
        </div>
        <div>
          <Button onClick={logOut} className="mt-5 bg-red-500">
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
