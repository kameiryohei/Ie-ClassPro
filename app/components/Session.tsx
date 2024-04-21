"use client";
import Link from "next/link";
import React from "react";
import useUser from "../hooks/useUser";

const Session = () => {
  const { session } = useUser();
  return (
    <div>
      <div className="pt-6 flex justify-center gap-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl duration-200">
          <Link href="/user/register">新規登録する</Link>
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl duration-200">
          <Link href="/user/register">ログインする</Link>
        </button>
      </div>
    </div>
  );
};

export default Session;
