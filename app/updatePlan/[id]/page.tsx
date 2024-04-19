"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { CourseType } from "@/app/allPost/[id]/types/Course";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import EditCorseList from "./EditCorseList";
import AddCourse from "./components/AddCourse";

const UpdatePlanPage = ({ params }: { params: { id: number } }) => {
  const tittleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    async function getDetailData(id: number) {
      const res = await fetch(`http://localhost:3000//api/plan/update/${id}`);
      method: "GET";
      const data = await res.json();
      return data;
    }
    getDetailData(params.id).then((data) => {
      tittleRef.current!.value = data.title;
      contentRef.current!.value = data.content;
      setCourses(data.courses);
    });
  }, []);

  return (
    <div className="py-8 px-10 md:px-36 relative">
      <IoArrowBackSharp
        size={36}
        className="absolute top-7 hover:ring-2 hover:ring-orange-500 rounded-full duration-200"
        onClick={() => router.back()}
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
            ref={tittleRef}
          />
          <p className="text-base font-medium md:text-xl text-center">
            ・履修プラン名
          </p>
          <Textarea
            className="text-base md:text-xl text-center h-32  ring-2 ring-gray-300"
            ref={contentRef}
          />
        </div>
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
        <AddCourse planId={Number(params.id)} />
      </div>
    </div>
  );
};

export default UpdatePlanPage;
