"use client";
import { Button } from "@/components/ui/button";
import useUser from "app/hooks/useUser";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import LogoutButton from "./LogoutButton";
import NotAllowPage from "app/components/NotAllowPage";

const ProfileContent = () => {
  const { user, isLoading, session, signOut } = useUser();
  const id = user?.id;

  if (!session) {
    return <NotAllowPage />;
  }

  return (
    <>
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
          <Link href={`/create/editplan/${id}`}>過去のプランを編集・削除</Link>
        </button>
      </div>
      <LogoutButton signOut={signOut} />
    </>
  );
};

export default ProfileContent;
