"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { CourseType } from "@/app/allPost/[id]/types/Course";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EditCorseList from "../EditCorseList";
import AddCourse from "./AddCourse";
import useUser from "@/app/hooks/useUser";
import { UserType } from "@/app/hooks/types/UserType";
import NotAllowPage from "@/app/components/NotAllowPage";

interface UpdatePageCoreProps {
  paramsId: number;
  title: string;
  content: string;
  courses: CourseType[];
  userData: UserType;
}

const UpdatePageCore = ({
  paramsId,
  title,
  content,
  courses,
  userData,
}: UpdatePageCoreProps) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const tittleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useUser();

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

      console.error(error);
    }
  }

  if (user?.id !== userData.id) {
    return <NotAllowPage />; //アクセス制限
  }

  return (
    <div className="py-8 px-10 md:px-36 relative">
      <IoArrowBackSharp
        size={36}
        className="absolute top-7 hover:ring-2 hover:ring-orange-500 rounded-full duration-200"
        onClick={() => {
          router.back();
          router.refresh();
        }}
      />

      <p className="text-xl font-medium md:text-2xl text-center">
        プラン編集画面
      </p>
      <div className="p-4 mt-4 flex flex-col gap-y-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-400">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium md:text-xl text-center">
            ・履修プラン名
          </p>
          <Input
            className="text-base md:text-xl text-center ring-2 ring-gray-300"
            type="text"
            defaultValue={title}
            ref={tittleRef}
            disabled={isUpdated}
          />
          <p className="text-base font-medium md:text-xl text-center">
            ・履修プラン名
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
      <div className="p-4 flex flex-col gap-y-2 mt-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-400">
        <p className="text-base font-medium md:text-xl text-center">
          ・現在登録中の教科一覧
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          {courses.map((course: CourseType) => (
            <EditCorseList
              key={course.id}
              id={course.id}
              name={course.name}
              content={course.content}
            />
          ))}
        </div>

        <div className="pt-4 flex justify-center items-center">
          <p className="text-base md:text-xl">・教科を追加する</p>
        </div>
        <AddCourse planId={Number(paramsId)} />
      </div>
    </div>
  );
};

export default UpdatePageCore;
