"use client";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { PostType } from "../types/postId";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

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
      toast.success("投稿を削除しました");
      router.push("/");
    } catch (error) {
      toast.error("投稿の削除に失敗しました");

      console.error(error);
    }
  }

  if (!session)
    return (
      <main className="flex justify-center items-center h-screen">
        <p>
          <Link href="/user/login" className="text-blue-500 hover:underline">
            ここをクリックしてログインしてください
          </Link>
        </p>
      </main>
    );

  return (
    <main className="max-w-md mx-auto p-6">
      <p className="text-2xl font-bold mb-4 text-center border-b-orange-500 border-b-4">
        あなたの投稿したレビュー
      </p>

      {user?.posts.length != 0 ? (
        user?.posts.map((p: PostType, index: number) => (
          <>
            <div
              key={index}
              className="border-b border-gray-200 py-6 flex justify-between"
            >
              <div>
                <p className="text-lg font-semibold">{p.title}</p>
                <p className="text-gray-600">{p.content}</p>
              </div>
              <div>
                <Button onClick={() => deletePost(p.id)}>削除</Button>
              </div>
            </div>
          </>
        ))
      ) : (
        <p>投稿がひとつもありません！</p>
      )}
      <Link
        href="/"
        className="text-blue-500 text-2xl font-semibold hover:underline mt-8 flex justify-center"
      >
        戻る
      </Link>
    </main>
  );
};

export default AddPostPage;
