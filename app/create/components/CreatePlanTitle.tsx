"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { postPlanSchema } from "./validate";
import { PlanTittle } from "../components/index";

const CreatePlanTitle = ({ sessionId }: { sessionId: string | undefined }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanTittle>({
    resolver: zodResolver(postPlanSchema),
  });

  const onSubmit = async (data: PlanTittle) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          content: data.description,
          auth_id: sessionId,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
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
      toast.error("エラーが発生しました。もう一度お試しください。");
      setIsLoading(false);
    }
  };

  return (
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
              isLoading ? "cursor-not-allowed bg-gray-500" : "bg-orange-500 "
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
  );
};

export default CreatePlanTitle;
