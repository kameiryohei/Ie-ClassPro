"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import { useState } from "react";
import NotAllowPage from "../components/NotAllowPage";

interface PlanTittleTypes {
  title: string;
  description: string;
}

const schema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().min(1, "内容を入力してください"),
});

const PlanCreate = () => {
  const router = useRouter();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanTittleTypes>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: PlanTittleTypes) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          content: data.description,
          userId: user?.user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("エラーが発生しました");
      }
      const responseJson = await res.json();
      const planId = responseJson.planId;
      const params = new URLSearchParams();
      params.append("planId", planId.toString());
      const href = `/create/create-plan?${params}`;
      router.push(href);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("エラーが発生しました。もう一度お試しください。");
    }
  };
  if (!user.session) {
    return <NotAllowPage />;
  }

  return (
    <div className="mx-auto text-3xl max-w-3xl lg:max-w-2xl px-2 sm:px-4 lg:px-6 pb-16 pt-24 text-center lg:pt-32">
      <div className="bg-slate-100 rounded-xl px-4 py-5 shadow-2xl">
        <h1>始めに履修プランのタイトルと内容を書いてください。</h1>
        <div className="py-3">
          <Label htmlFor="title" className="text-lg font-light">
            タイトル
          </Label>
          <Input
            {...register("title")}
            type="text"
            id="title"
            placeholder="タイトル"
            className="mt-3 bg-slate-50 shadow-lg w-full p-4"
          />
          {errors.title && (
            <span className="text-red-500 text-center text-base">
              {errors.title.message?.toString()}
            </span>
          )}

          <div className="py-2 grid w-full gap-1.5">
            <Label htmlFor="description" className="text-lg font-light">
              内容
            </Label>
            <Textarea
              {...register("description")}
              placeholder="履修プランの説明を簡単に書いてください"
              id="description"
              className="mt-3 resize-none h-32 w-full bg-slate-50 px-4 py-4 shadow-lg"
            />
            {errors.description && (
              <span className="text-red-500 text-center text-base">
                {errors.description.message?.toString()}
              </span>
            )}
            <div className="pt-3">
              <button
                type="submit"
                className={`p-3 text-sm rounded-2xl text-white w-full shadow-lg hover:bg-orange-600 ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-500"
                    : "bg-orange-500 "
                }`}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <p>投稿中・・・</p>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  </div>
                ) : (
                  "投稿する"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCreate;
