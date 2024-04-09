"use client";
import useUser from "@/app/hooks/useUser";
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

  const onSubmit: SubmitHandler<{
    title: string;
    authorId: number;
  }> = async (data) => {
    try {
      const res = await fetch("/api/post/", {
        cache: "no-store", // ssr
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          id: id,
          authorId: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      toast.success("投稿しました");
    } catch (error) {
      console.error("Error:", error);
      toast.error("投稿に失敗しました");
    }
  };

  if (!session)
    return (
      <main className="flex justify-center items-center h-screen">
        <p>
          <Link
            href="/user/login"
            className="text-2xl text-blue-500 hover:underline"
          >
            ログインすることで投稿できます！
          </Link>
        </p>
      </main>
    );

  return (
    <main className="max-w-md mx-auto p-6">
      <p className="text-2xl font-bold mb-4">Add Post</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            id="title"
            type="text"
            placeholder="口コミを投稿"
            {...register("title", {
              required: {
                value: true,
                message: "タイトルを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.title && (
            <div className="text-red-500 text-sm">{errors.title.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          追加
        </button>
      </form>
    </main>
  );
};

export default CourseReview;
