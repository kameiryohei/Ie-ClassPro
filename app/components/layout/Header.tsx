"use client";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
import useUser from "@/app/hooks/useUser";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { session } = useUser();

  return (
    <div className="fixed top-0 z-10 w-full divide-y border-gray-300 dark:border-gray-800 border-b bg-white shadow-md">
      <div className="px-8 py-4 items-center lg:px-6 lg:py-6">
        <div className="flex justify-between items-center md:space-y-0 md:space-x-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter mr-4">
            ClassPlanner
          </Link>
          <nav className="space-x-6 text-sm hidden lg:block">
            <Link
              href="/"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              ホーム
            </Link>

            <Link
              href="/allPost"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              すべての投稿を見る
            </Link>
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  マイページ
                </Link>
                <Link
                  href="/create"
                  className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  履修プランを作成
                </Link>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-2xl">
                  ログイン中です
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/user/login"
                  className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  ログイン
                </Link>
                <Link
                  href="/user/register"
                  className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  新規登録
                </Link>
                <button className="px-4 py-2 bg-red-500 text-white rounded-2xl">
                  ログインしていません
                </button>
              </>
            )}
          </nav>
          <div className="block lg:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} size={30} />
            <ProfileDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
