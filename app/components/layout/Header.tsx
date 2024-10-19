import useSeverUser from "app/hooks/useSeverUser";
import Link from "next/link";
import HamburgerMenu from "./Modal/HamburgerMenu";

const Header = async () => {
  const { session } = useSeverUser();
  const sessionId = await session();

  return (
    <div className="fixed top-0 z-10 w-full divide-y border-gray-300 border-b bg-white shadow-md">
      <div className="px-8 py-4 items-center lg:px-6 lg:py-6">
        <div className="flex justify-between items-center md:space-y-0 md:space-x-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter mr-4 px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ClassPlanner
          </Link>
          <nav className="space-x-6 text-sm hidden lg:block">
            <Link
              href="/"
              className="font-medium text-gray-800 transition-colors px-2 py-1 rounded-lg hover:bg-gray-200"
            >
              ホーム
            </Link>

            <Link
              href="/allPost"
              className="font-medium text-gray-800 transition-colors px-2 py-1 rounded-lg hover:bg-gray-200"
            >
              すべての投稿を見る
            </Link>
            {(await session()) ? (
              <>
                <Link
                  href="/profile"
                  className="font-medium text-gray-800 transition-colors px-2 py-1 rounded-lg hover:bg-gray-200"
                >
                  マイページ
                </Link>
                <Link
                  href="/create"
                  className="font-medium text-gray-800 transition-colors px-2 py-1 rounded-lg hover:bg-gray-200"
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
                  href="/login"
                  className="font-medium text-gray-800 transition-colors px-2 py-1 rounded-lg hover:bg-gray-200"
                >
                  ログイン / 新規登録
                </Link>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-2xl">
                  ログインしていません
                </button>
              </>
            )}
          </nav>
          <HamburgerMenu sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
};

export default Header;
