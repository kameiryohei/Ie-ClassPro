"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import EditCourse from "./EditCourse";
import { CourseType } from "@/app/allPost/[id]/types/Course";

const UpdatePlanPage = ({ params }: { params: { id: number } }) => {
  const tittleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getDetailData(id: number) {
      const res = await fetch(`http://localhost:3000//api/plan/update/${id}`);
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
    <div className="py-8 px-14 md:px-36 relative">
      <p className="text-base font-medium md:text-2xl text-center">
        プラン編集画面
      </p>
      <div className="p-4 mt-4 flex flex-col gap-y-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-300">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium md:text-xl text-center">
            ・履修プラン名
          </p>
          <Input
            className="text-base md:text-xl text-center"
            type="text"
            ref={tittleRef}
          />
          <p className="text-base font-medium md:text-xl text-center">
            ・履修プラン名
          </p>
          <Textarea
            className="text-base md:text-xl text-center h-32"
            ref={contentRef}
          />
        </div>
        <div className="p-4 mt-4 flex flex-col gap-y-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-300">
          {courses.map((course: CourseType) => (
            <EditCourse
              key={course.id}
              id={course.id}
              name={course.name}
              content={course.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatePlanPage;
