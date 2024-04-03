"use client";
import { useSearchParams } from "next/navigation";
import CourseCreateForm from "./components/CourseCreateForm";

const CourseCreate = () => {
  const params = useSearchParams();
  const planId = params.get("planId");

  return (
    <div>
      <div className="px-2 py-20">
        <p className="text-2xl font-semibold text-center">
          次に、教科名と内容を入力してください
        </p>
        <CourseCreateForm planId={planId} />
      </div>
    </div>
  );
};

export default CourseCreate;
