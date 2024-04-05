import CourseList from "./components/CourseList";
import { CourseType } from "./types/Course";

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
    <div className="px-14 md:px-36">
      <p className="text-2xl">作成者：{user.name}</p>
      <p className="text-2xl">学校名：{user.university}</p>
      <p className="text-2xl">
        学部・学科名：{user.faculty},{user.department}
      </p>
      <p className=" font-semibold">履修プラン名:{title}</p>
      <p className=" font-semibold">プラン内容:{content}</p>
      <p className=""></p>
      <div className="">
        <p className="font-semibold text-center text-2xl">
          <span className="border-b-4 border-orange-400 inline-block">
            履修科目一覧
          </span>
        </p>
        <div className="pt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 mx-auto">
          {courses.map((course: CourseType) => (
            <CourseList
              key={course.id}
              name={course.name}
              content={course.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
