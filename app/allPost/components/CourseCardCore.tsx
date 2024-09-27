import { headers } from "next/headers";
import { CourseListType } from "../types/CourseListType";
import CardList from "./CardList";
import { config } from "@/lib/config";

async function getAllCoursesDate(host: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan`, {
    cache: "no-cache", //ssr
  });
  const data = await res.json();
  return data.posts;
}

const CourseCardCore = async () => {
  const host = headers().get("host");
  const AllCourseDate = await getAllCoursesDate(host!);
  return (
    <>
      <div className="mt-4 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {AllCourseDate.map((course: CourseListType) => (
          <CardList
            key={course.id}
            id={course.id}
            tittle={course.title}
            content={course.content}
            user={course.user}
          />
        ))}
      </div>
    </>
  );
};

export default CourseCardCore;
