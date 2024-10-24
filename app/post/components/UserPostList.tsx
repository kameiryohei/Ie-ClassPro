"use client";
import toast from "react-hot-toast";
import { Posts } from "../types/PostType";
import { useReducer, useState } from "react";

interface UserPostListProps {
  data: Posts[];
}

type State = {
  [key: string]: boolean;
};
type Action = {
  type: "LOADING_START" | "LOADING_END";
  payload: string;
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOADING_START":
      return { ...state, [action.payload]: true };
    case "LOADING_END":
      return { ...state, [action.payload]: false };
    default:
      return state;
  }
};

const UserPostList = ({ data }: UserPostListProps) => {
  const [deletedPostIds, setDeletedPostIds] = useState<number[]>([]);
  const [loadingStates, dispatch] = useReducer(reducer, {});

  async function deletePost(postId: number) {
    dispatch({ type: "LOADING_START", payload: postId.toString() });
    try {
      const response = await fetch(`/api/post`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      if (!data.post) {
        toast.error("エラーが発生しました");
      }
      toast.success("投稿を削除しました");
      dispatch({ type: "LOADING_END", payload: postId.toString() });
      setDeletedPostIds((prevDeletedPostIds) => [
        ...prevDeletedPostIds,
        postId,
      ]);
    } catch (error) {
      toast.error("投稿の削除に失敗しました");
    }
  }

  return (
    <div className="pt-6 grid md:grid-cols-2 gap-9">
      {data.length !== 0 ? (
        data.map((post: Posts) =>
          !deletedPostIds.includes(post.id) ? (
            <div
              key={post.id}
              className="flex flex-col gap-y-3 lg:justify-between items-center bg-orange-200 rounded-xl px-4 py-6 border-b border-gray-200 ring-2 ring-gray-100"
            >
              <div>
                <p className="text-lg font-semibold">投稿内容：{post.title}</p>
                <p className="text-gray-600">
                  投稿日付：
                  {new Date(post.createdAt).toLocaleDateString()}日・ 投稿時間：{" "}
                  {new Date(post.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-4">
                <button
                  className={`text-white px-5 py-3 duration-200 rounded-xl ${
                    loadingStates[post.id]
                      ? "bg-gray-500"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={() => deletePost(post.id)}
                  disabled={loadingStates[post.id]}
                >
                  {loadingStates[post.id] ? (
                    <div className="flex">
                      <p>削除中・・・</p>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    </div>
                  ) : (
                    "削除する"
                  )}
                </button>
              </div>
            </div>
          ) : null
        )
      ) : (
        <div className="col-span-2 flex justify-center">
          <p className="text-xl md:text-3xl">投稿がひとつもありません！</p>
        </div>
      )}
    </div>
  );
};

export default UserPostList;
