import Link from "next/link";
import CourseList from "./components/CourseList";
import CourseReview from "./components/CourseReview";
import { CourseType } from "./types/Course";
import { IoArrowBackSharp } from "react-icons/io5";

async function getDetailData(id: number) {
  const res = await fetch(`http://localhost:3000//api/plan/${id}`, {
    cache: "no-store", //ssr
  });
  const data = await res.json();
  return data;
}

const page = async ({ params }: { params: { id: number } }) => {
  const CourseData = await getDetailData(params.id);
  const { title, content, user, courses } = CourseData;
  return (
    <div className="px-14 md:px-36 relative">
      <Link href="/allPost">
        <IoArrowBackSharp
          size={36}
          className="absolute top-7 hover:ring-2 hover:ring-orange-500 rounded-full duration-200"
        />
      </Link>
      <p className="pt-8 text-2xl font-semibold text-center">
        <span className="border-b-4 border-orange-400 inline-block">
          履修プラン詳細
        </span>
      </p>
      <div className="flex justify-center">
        <div className="mx-auto inline-block px-6 py-4 my-4 bg-gray-100 rounded-xl shadow-2xl ring-2 ring-gray-300">
          <p className="text-lg font-light text-center">ユーザー情報</p>
          <p className="text-base md:text-xl">作成者：{user.name}</p>
          <p className="text-base md:text-xl">学校名：{user.university}</p>
          <p className="text-base md:text-xl">
            学部・学科名：{user.faculty}・{user.department}
          </p>
          <p className="text-base md:text-xl">学年：{user.grade}年生</p>
        </div>
      </div>
      <p className=" font-semibold">履修プラン名:{title}</p>
      <p className=" font-semibold">プラン内容:{content}</p>
      <p className=""></p>
      <div className="">
        <p className="font-semibold text-center text-2xl">
          <span className="border-b-4 border-orange-400 inline-block">
            履修科目一覧
          </span>
        </p>
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 mx-auto">
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
        <CourseReview />
      </div>
    </div>
  );
};

export default page;
