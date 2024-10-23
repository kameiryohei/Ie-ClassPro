import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import { headers } from "next/headers";
import { config } from "lib/config";
import UserInfoCard from "./components/UserInfoCard";
import PlanDetails from "./components/PlanDetails";
import CourseListSection from "./components/CourseListSection";
import ReviewSection from "./components/ReviewSection";
import useSeverUser from "app/hooks/useSeverUser";

async function getDetailData(id: string, host: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan/${id}`, {
    cache: "no-store", //ssr
    method: "GET",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "" },
  });
  const data = await res.json();
  return data;
}

const SpecificPage = async ({ params }: { params: { id: string } }) => {
  const host = headers().get("host");
  const CourseData = await getDetailData(params.id, host!);
  const { title, content, user, courses } = CourseData;
  const { session } = useSeverUser();
  const auth_id = await session();
  return (
    <>
      <div className="py-8 px-10 md:px-36 relative">
        {/* 戻るボタン */}
        <Link href="/allPost">
          <IoArrowBackSharp
            size={36}
            className="absolute top-7 hover:ring-2 hover:ring-orange-500 rounded-full duration-200"
          />
        </Link>

        {/* ページタイトル */}
        <p className="text-2xl font-semibold text-center">
          <span className="border-b-4 border-orange-400 inline-block">
            履修プラン詳細
          </span>
        </p>

        {/* ユーザー情報 */}
        <div className="flex justify-center">
          <UserInfoCard user={user} />
        </div>

        {/* Plan詳細 */}
        <PlanDetails title={title} content={content} />

        {/* カードリスト */}
        <div className="pt-4">
          <p className="font-semibold text-center text-2xl">
            <span className="border-b-4 border-orange-400 inline-block">
              履修科目一覧
            </span>
          </p>
          <CourseListSection courses={courses} />
        </div>

        {/* レビューセクション */}
        <ReviewSection id={params.id} auth_id={auth_id!} />
      </div>
    </>
  );
};

export default SpecificPage;
