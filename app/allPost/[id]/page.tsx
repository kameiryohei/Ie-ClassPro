import Link from "next/link";
import CourseList from "./components/CourseList";
import CourseReview from "./components/CourseReview";
import { CourseType } from "./types/Course";
import { IoArrowBackSharp } from "react-icons/io5";
import ParticleReview from "./components/ParticleReview";
import { headers } from "next/headers";
import { config } from "@/lib/config";

async function getDetailData(id: number, host: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan/${id}`, {
    cache: "no-store", //ssr
  });
  const data = await res.json();
  return data;
}

const SpecificPage = async ({ params }: { params: { id: number } }) => {
  const host = headers().get("host");
  const CourseData = await getDetailData(params.id, host!);
  const { title, content, user, courses } = CourseData;
  return (
    <>
      <div className="py-8 px-10 md:px-36 relative">
        <Link href="/allPost">
          <IoArrowBackSharp
            size={36}
            className="absolute top-7 hover:ring-2 hover:ring-orange-500 rounded-full duration-200"
          />
        </Link>
        <p className="text-2xl font-semibold text-center">
          <span className="border-b-4 border-orange-400 inline-block">
            履修プラン詳細
          </span>
        </p>
        <div className="flex justify-center">
          <div className="mx-auto inline-block px-6 py-4 my-4 bg-gray-100 rounded-xl shadow-2xl ring-2 ring-gray-300">
            <p className="text-lg font-light text-center border-b-2 border-gray-400">
              作成者情報
            </p>
            <div className="flex flex-col gap-y-1">
              <p className="text-base md:text-xl text-center">
                作成者：{user.name}さん
              </p>
              <p className="text-base md:text-xl text-center">
                学校名：{user.university}
              </p>
              <p className="text-base md:text-xl text-center">
                学部名 :{user.faculty}
              </p>
              <p className="text-base md:text-xl text-center">
                学科名：{user.department}
              </p>
              <p className="text-base md:text-xl text-center">
                学年：{user.grade}年生
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-y-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-300">
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium md:text-xl text-center">
              ・履修プラン名
            </p>
            <p className="text-base md:text-xl text-center">{title}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium md:text-xl text-center">
              ・履修プラン名
            </p>
            <p className="text-base md:text-xl text-center">{content}</p>
          </div>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-center text-2xl">
            <span className="border-b-4 border-orange-400 inline-block">
              履修科目一覧
            </span>
          </p>
          <div className="p-4 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 mx-auto bg-slate-50 ring-2 ring-gray-300 rounded-xl shadow-2xl">
            {courses.map((course: CourseType) => (
              <CourseList
                key={course.id}
                name={course.name}
                content={course.content}
              />
            ))}
          </div>
        </div>
        <p className="pt-4 font-semibold text-center text-2xl">
          <span className="border-b-4 border-orange-400 inline-block">
            レビュー
          </span>
        </p>
        <div>
          <CourseReview id={params.id} />
        </div>
        <div>
          <ParticleReview id={params.id} />
        </div>
      </div>
    </>
  );
};

export default SpecificPage;
