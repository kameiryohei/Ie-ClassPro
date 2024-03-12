"use client";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { PostType } from "../types/postId";
import Link from "next/link";
import toast from "react-hot-toast";

const AddPostPage = () => {
  const { session, user } = useUser();
  const router = useRouter();
  //投稿を削除するAPIを呼び出す
  async function deletePost(postId: number) {
    try {
      const response = await fetch(`/api/post`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log(data.message); // 成功メッセージを表示
      toast.success("投稿を削除しました");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

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
              <button
                onClick={() => deletePost(p.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                削除
              </button>
            </div>
          </>
        ))
      ) : (
        <p>投稿がひとつもありません！</p>
      )}
      <Link href="/" className="text-blue-500 hover:underline">
        戻る
      </Link>
    </main>
  );
};

export default AddPostPage;
