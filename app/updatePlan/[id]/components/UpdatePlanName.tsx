"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface UpdatePlanNameProps {
  title: string;
  content: string;
  paramsId: string;
}

const UpdatePlanName = ({ title, content, paramsId }: UpdatePlanNameProps) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tittleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  async function tittleUpdate(id: number, title: string, content: string) {
    if (!title || !content) {
      toast.error("全ての項目を入力してください");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/plan`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ id, title, content }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(`プラン名：${data.post.title}を更新しました`);
      setIsLoading(false);
      setIsUpdated(true);
    } catch (error) {
      toast.error("投稿の削除に失敗しました");
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 mt-4 flex flex-col gap-y-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-400">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium md:text-xl text-center underline">
          履修プランタイトル
        </p>
        <Input
          className="text-base md:text-xl text-center ring-2 ring-gray-300"
          type="text"
          defaultValue={title}
          ref={tittleRef}
          disabled={isUpdated}
        />
        <p className="text-lg font-medium md:text-xl text-center underline">
          履修プラン説明
        </p>
        <Textarea
          className="text-base md:text-xl text-center h-32  ring-2 ring-gray-300"
          defaultValue={content}
          ref={contentRef}
          disabled={isUpdated}
        />
      </div>
      <button
        className={`px-6 py-2 rounded-lg duration-300 text-white text-center ${
          isUpdated ? "bg-gray-400" : " bg-green-700 hover:bg-green-800"
        }`}
        onClick={() => {
          tittleUpdate(
            Number(paramsId),
            tittleRef.current!.value,
            contentRef.current!.value
          );
        }}
        disabled={isUpdated}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p>更新中・・・</p>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          </div>
        ) : (
          "更新する"
        )}
      </button>
    </div>
  );
};

export default UpdatePlanName;
