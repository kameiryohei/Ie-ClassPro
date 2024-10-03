import { CourseType } from "../types/Course";
import CourseList from "./CourseList";

interface CourseListSectionProps {
  courses: CourseType[];
}
const CourseListSection = ({ courses }: CourseListSectionProps) => {
  return (
    <div className="p-4 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 mx-auto bg-slate-50 ring-2 ring-gray-300 rounded-xl shadow-2xl">
      {courses.length === 0 ? (
        <p className="col-span-2 flex justify-center font-bold text-xl text-red-500">
          このプランには履修科目が登録されていません！
        </p>
      ) : (
        courses.map((course: CourseType) => (
          <CourseList
            key={course.id}
            name={course.name}
            content={course.content}
          />
        ))
      )}
    </div>
  );
};

export default CourseListSection;
