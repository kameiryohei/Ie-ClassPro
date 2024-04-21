"use client";
import useUser from "@/app/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CourseReviewProps {
  id: number;
}
const CourseReview: React.FC<CourseReviewProps> = ({ id }) => {
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
  const { session, user } = useUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<{
    title: string;
    authorId: number;
  }> = async (data) => {
    try {
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
      console.log(res);
      toast.success("投稿しました");
      router.push("/allPost");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("投稿に失敗しました");
    }
  };

  if (!session)
    return (
      <main className="flex justify-center pt-5">
        <p>
          <Link
            href="/user/login"
            className="p-3 text-base md:text-2xl bg-white rounded-xl ring-2 ring-gray-300 text-blue-500 hover:underline"
          >
            ログインすることで投稿できます！
          </Link>
        </p>
      </main>
    );

  return (
    <main className="max-w-md mx-auto p-6">
      <p className="md:text-xl text-center font-bold mb-4">クチコミを投稿</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="mb-4">
          <Input
            id="title"
            type="text"
            placeholder="ここに入力してください"
            {...register("title", {
              required: {
                value: true,
                message: "タイトルを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {errors.title && (
            <div className="text-red-500 text-sm">{errors.title.message}</div>
          )}
        </div>
        <Button type="submit">追加</Button>
      </form>
    </main>
  );
};

export default CourseReview;
