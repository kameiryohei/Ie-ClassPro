import SpecificCourseCore from "./SpecificCourseCore";
import { GetDetailCourseDataResponse, SpecificCourseType } from "../types";
import Link from "next/link";
import useSeverUser from "app/hooks/useSeverUser";
import { redirect } from "next/navigation";

interface SpecificCourseDateProps {
  SpecificCourseDate: GetDetailCourseDataResponse;
}

const EditPlanCore = async ({
  SpecificCourseDate,
}: SpecificCourseDateProps) => {
  const { plans, auth_id } = SpecificCourseDate;
  const { session } = useSeverUser();
  const sessionId = await session();
  if (sessionId !== auth_id) {
    redirect("/profile");
  }
  return (
    <div>
      <div className="px-10 py-4 pb-24 flex flex-col justify-center">
        <p className="font-semibold text-center text-xl md:text-3xl">
          <span className="border-b-4 border-orange-500 inline-block">
            これまで投稿した履修プラン
          </span>
        </p>
        <div className="px-4 lg:px-32 mt-4 grid gap-5 grid-cols-1 lg:grid-cols-2">
          {plans.map((course: SpecificCourseType) => (
            <SpecificCourseCore
              key={course.id}
              id={course.id}
              title={course.title}
              content={course.content}
              userId={course.userId}
            />
          ))}
        </div>
        <Link
          href="/profile"
          className="text-orange-500 text-2xl font-semibold hover:underline mt-8 text-center block"
        >
          戻る
        </Link>
      </div>
    </div>
  );
};

export default EditPlanCore;
