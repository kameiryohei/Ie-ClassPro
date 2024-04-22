"use client";
import Link from "next/link";
import React from "react";
import useUser from "../hooks/useUser";

const HomeSession = () => {
  const { session } = useUser();

  return (
    <div>
      {session ? (
        <div className="pt-6 flex justify-center">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-2xl">
            ログイン中です
          </button>
        </div>
      ) : (
        <div className="pt-6 flex justify-center gap-8">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl duration-200">
            <Link href="/user/register">新規登録する</Link>
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl duration-200">
            <Link href="/user/register">ログインする</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeSession;
