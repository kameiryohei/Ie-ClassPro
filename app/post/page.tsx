"use client";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { PostType } from "../types/postId";
import Link from "next/link";

const AddPostPage = () => {
  const { session, user } = useUser();
  const router = useRouter();
  //投稿を削除するAPIを呼び出す

  if (!session)
    return (
      <main className="flex justify-center items-center h-screen">
        <p>
          <a href="/user/login" className="text-blue-500 hover:underline">
            ログインしてね！
          </a>
        </p>
      </main>
    );

  return (
    <main className="max-w-md mx-auto p-6">
      <p className="text-2xl font-bold mb-4">Your Post</p>

      {user?.posts.length != 0 ? (
        user?.posts.map((p: PostType, index: number) => (
          <>
            <div key={index} className="border-b border-gray-200 py-4">
              <p className="text-lg font-semibold">{p.title}</p>
              <p className="text-gray-600">{p.content}</p>
            </div>
          </>
        ))
      ) : (
        <p>post not found</p>
      )}
      <Link href="/" className="text-blue-500 hover:underline">
        戻る
      </Link>
    </main>
  );
};

export default AddPostPage;
