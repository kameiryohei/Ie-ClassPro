"use client";
import { Suspense } from "react";
import Course from "./components/Course";

const CourseCreate = () => {
  return (
    <div>
      <Suspense>
        <Course />
      </Suspense>
    </div>
  );
};

export default CourseCreate;
