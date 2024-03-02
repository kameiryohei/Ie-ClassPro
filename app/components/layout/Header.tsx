import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="divide-y border-gray-300 dark:border-gray-800 border-b">
      <div className="px-4 py-3 md:py-6 lg:px-6">
        <div className="flex items-center space-y-2 md:space-y-0 md:space-x-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter mr-4">
            ClassPlanner
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              href="/"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              ホーム
            </Link>

            <Link
              href="/using"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              使い方
            </Link>
            <Link
              href="/login"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              ログイン・新規登録
            </Link>
            <Link
              href="/review"
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
            >
              レビュー投稿
            </Link>
            <Link href="/create">
              <Button>履修プランを投稿</Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
