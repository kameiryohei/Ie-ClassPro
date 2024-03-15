"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
import useUser from "@/app/hooks/useUser";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { session, user, signOut } = useUser();

  return (
    <div className="divide-y border-gray-300 dark:border-gray-800 border-b bg-white shadow-md">
      <div className="px-4 py-6 items-center lg:px-6">
        <div className="flex justify-between md:space-y-0 md:space-x-6">
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
              href="/post/add"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              レビュー投稿
            </Link>
            <Link
              href="/allPost"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              すべての投稿を見る
            </Link>
            {session ? (
              <Link
                href="/profile"
                className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
              >
                マイページ
              </Link>
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
              </>
            )}

            <Link href="/create">
              <Button>履修プランを投稿</Button>
            </Link>
          </nav>
          <div className="block lg:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} />
            <ProfileDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
