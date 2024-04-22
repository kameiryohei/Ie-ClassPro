"use client";
import useUser from "../hooks/useUser";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { PostType } from "./types/PostType";
import { useState } from "react";

const AddPostPage = () => {
  const { session, user } = useUser();
  const [deletedPostIds, setDeletedPostIds] = useState<number[]>([]);

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
      setDeletedPostIds((prevDeletedPostIds) => [
        ...prevDeletedPostIds,
        postId,
      ]);
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
    <main className="px-12 md:px-48 mx-auto p-6">
      <p className="font-semibold text-center text-xl md:text-3xl">
        <span className="border-b-4 border-orange-500 inline-block">
          これまで投稿したレビュー
        </span>
      </p>
      <div className="pt-6 grid lg:grid-cols-2 gap-9">
        {user?.posts.length !== 0 ? (
          user?.posts.map((post: PostType) =>
            !deletedPostIds.includes(post.id) ? (
              <div key={post.id}>
                <div
                  className={`px-4 border-b border-gray-200 flex justify-between py-6 bg-orange-200 rounded-xl`}
                >
                  <div>
                    <p className="text-lg font-semibold">
                      投稿内容：{post.title}
                    </p>
                    <p className="text-gray-600">
                      投稿日時：
                      {new Date(post.createdAt).toLocaleDateString()}
                      {new Date(post.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <Button onClick={() => deletePost(post.id)}>削除</Button>
                  </div>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>投稿がひとつもありません！</p>
        )}
      </div>
      <Link
        href="/profile"
        className="text-orange-500 text-2xl font-semibold hover:underline mt-8 text-center block"
      >
        戻る
      </Link>
    </main>
  );
};

export default AddPostPage;
