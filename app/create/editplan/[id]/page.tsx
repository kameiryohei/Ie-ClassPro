import { headers } from "next/headers";
import SpecificCourseCore from "./components/SpecificCourseCore";
import { config } from "@/lib/config";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";

type SpecificCourseType = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

async function getDetailCourseData(id: number, host: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan/detail/${id}`, {
    cache: "no-store", //ssr
  });
  const data = await res.json();
  return data.plans;
}

const EditCoursePage = async ({ params }: { params: { id: number } }) => {
  const host = headers().get("host");
  const SpecificCourseDate = await getDetailCourseData(params.id, host!);
  return (
    <div className="px-10 py-4 pb-24 flex flex-col justify-center">
      <p className="font-semibold text-center text-xl md:text-3xl">
        <span className="border-b-4 border-orange-500 inline-block">
          これまで投稿した履修プラン
        </span>
      </p>
      <div className="px-4 lg:px-32 mt-4 grid gap-5 grid-cols-1 lg:grid-cols-2">
        {SpecificCourseDate.map((course: SpecificCourseType) => (
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
  );
};

export default EditCoursePage;
