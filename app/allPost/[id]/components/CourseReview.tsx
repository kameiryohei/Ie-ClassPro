"use client";
import useUser from "app/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CourseReviewProps {
  id: number;
}
const CourseReview = ({ id }: CourseReviewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; authorId: number }>({
    defaultValues: {
      title: "",
      authorId: 0,
    },
  });
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<{
    title: string;
    authorId: number;
  }> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("../api/post/coursepost/", {
        cache: "no-store", // ssr
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          id: Number(id),
          authorId: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        toast.error("エラーが発生しました");
      }
      setIsLoading(false);
      toast.success("投稿しました");
      router.push("/allPost");
      router.refresh();
    } catch (error) {
      toast.error("投稿に失敗しました");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <p className="md:text-xl text-center font-bold mb-4">クチコミを投稿</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center md:flex-row gap-4"
      >
        <div className="mb-4">
          <Input
            id="title"
            type="text"
            placeholder="ここに入力してください"
            size={40}
            {...register("title", {
              required: {
                value: true,
                message: "文字を入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full placeholder:text-center"
          />
          {errors.title && (
            <div className="text-red-500 text-sm text-center mt-3">
              {errors.title.message}
            </div>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <p>投稿中です・・・</p>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white-600" />
            </>
          ) : (
            "投稿する"
          )}
        </Button>
      </form>
    </main>
  );
};

export default CourseReview;
