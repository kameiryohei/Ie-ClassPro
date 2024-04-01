import React from "react";
import CourseCreateForm from "./components/CourseCreateForm";

const CourseCreate = () => {
  return (
    <div>
      <div className="py-20">
        <p className="text-2xl font-semibold text-center">
          次に、教科名と内容を入力してください
        </p>
        <CourseCreateForm />
      </div>
    </div>
  );
};

export default CourseCreate;
