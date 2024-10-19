import Link from "next/link";
import React from "react";
import useSeverUser from "app/hooks/useSeverUser";

const HomeSession = async () => {
  const { session } = useSeverUser();
  const id = await session();
  return (
    <div>
      {id ? (
        <div className="pt-6 flex justify-center">
          <Link href="/allPost">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-2xl">
              履修プランを見る
            </button>
          </Link>
        </div>
      ) : (
        <div className="pt-6 flex justify-center gap-8">
          <Link href="/login">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-2xl">
              ログイン or 新規登録する
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeSession;
