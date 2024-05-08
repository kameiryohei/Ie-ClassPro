"use client";
import useUser from "@/app/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { FormData } from "./types/EditType";
import { useEffect } from "react";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";

const EditProfile = async (
  name: string,
  auth_id: string,
  university: string,
  faculty: string,
  department: string,
  grade: number
) => {
  const res = await fetch("/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      auth_id,
      university,
      faculty,
      department,
      grade,
    }),
  });
  const data = await res.json();
  return data;
};

const formSchema = z.object({
  name: z.string().min(1, "ユーザー名は1文字以上で入力してください。"),
  university: z.string().min(1, "大学名は1文字以上で入力してください。"),
  faculty: z.string().min(1, "学部名は1文字以上で入力してください。"),
  department: z.string().min(1, "学科名は1文字以上で入力してください。"),
  grade: z.string().min(1, "学年は1文字以上で入力してください。"),
});

const EditPage = () => {
  const { user, session } = useUser();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (session?.user?.id) {
      const res = await EditProfile(
        data.name,
        session.user.id,
        data.university,
        data.faculty,
        data.department,
        typeof data.grade === "string" ? parseInt(data.grade) : data.grade // gradeをnumberに変換
      );
      if (res.message === "Updated successfully") {
        toast.success("プロフィールを更新しました");
        router.push("/profile");
      } else {
        toast.error("プロフィールの更新に失敗しました");
        console.error(res);
      }
    } else {
      console.error("session.user.id is null");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      university: user?.university || "",
      faculty: user?.faculty || "",
      department: user?.department || "",
      grade: user?.grade || "",
    },
  });
  // useEffectで初期値を設定
  useEffect(() => {
    setValue("name", user?.name || "");
    setValue("university", user?.university || "");
    setValue("faculty", user?.faculty || "");
    setValue("department", user?.department || "");
    setValue("grade", user?.grade?.toString() || ""); // gradeはstringに変換
  }, [user, setValue]);

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <div className="bg-gray-100 rounded-2xl shadow-2xl py-2">
        <Link
          href="/profile"
          className="text-gray-500 hover:text-gray-900 duration-300"
        >
          <MdChevronLeft size={60} className=" absolute" />
        </Link>
        <h1 className="text-2xl font-bold text-center inline-block border-b-orange-500 border-b-4">
          ユーザー情報変更
        </h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <div>
                <p className="font-light">ユーザー名</p>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="名前を変更する場合は入力してください"
                  className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
                />
                {errors.name && (
                  <p className="text-red-600 mt-4 text-center">
                    ユーザー名は1文字以上で入力してください。
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <p className="font-light">学校名</p>
              <Input
                {...register("university")}
                type="text"
                placeholder="大学名を変更する場合は入力してください"
                className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
              />
              {errors.university && (
                <p className="text-red-600 mt-4 text-center">
                  大学名は1文字以上で入力してください。
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="font-light">学部名</p>
              <Input
                {...register("faculty")}
                type="text"
                placeholder="学部名を変更する場合は入力してください"
                className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
              />
              {errors.faculty && (
                <p className="text-red-600 mt-4 text-center">
                  学部名は1文字以上で入力してください。
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="font-light">学科名</p>
              <Input
                {...register("department")}
                type="text"
                placeholder="学科名を変更する場合は入力してください"
                className="text-center placeholder:text-center placeholder:text-gray-500"
              />
              {errors.department && (
                <p className="text-red-600 mt-4 text-center">
                  学科名は1文字以上で入力してください
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="font-light">学年</p>
              <Input
                {...register("grade")}
                type="number"
                min="1"
                max="4"
                placeholder="学年を変更する場合は入力してください"
                className="text-center placeholder:text-center placeholder:text-gray-500 h-10"
              />
              {errors.grade && (
                <p className="text-red-600 mt-4 text-center">
                  1~4の数字を入力してください
                </p>
              )}
            </div>
            <Button className="mt-3">更新</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
