"use client";
import useUser from "./hooks/useUser";

export default function Home() {
  const { session, user, signOut } = useUser();

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-lg">
        <p className="text-2xl font-bold mb-4">Top Page</p>

        {session ? (
          <div>
            <p className="mb-2">ログイン中です {user?.email}</p>
            <div className="mb-2">
              <a href="/post" className="text-blue-500 hover:underline">
                post一覧
              </a>
            </div>
            <div className="mb-2">
              <a href="/post/add" className="text-blue-500 hover:underline">
                post追加
              </a>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2">ログアウト中</p>
            <div className="mb-2">
              <a
                href="/user/register"
                className="text-blue-500 hover:underline"
              >
                新規登録ページ
              </a>
            </div>
            <div className="mb-2">
              <a href="/user/login" className="text-blue-500 hover:underline">
                ログインページ
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
