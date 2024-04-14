import SpecificCourseCore from "./components/SpecificCourseCore";

type SpecificCourseType = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

async function getDetailCourseData(id: number) {
  const res = await fetch(`http://localhost:3000//api/plan/detail/${id}`, {
    cache: "no-store", //ssr
  });
  const data = await res.json();
  return data.plans;
}

const EditCoursePage = async ({ params }: { params: { id: number } }) => {
  const SpecificCourseDate = await getDetailCourseData(params.id);
  return (
    <div className="px-10 py-4 flex flex-col justify-center">
      <p className="text-center text-lg font-semibold">
        これまで投稿したプラン一覧
      </p>
      <div className="mt-4 grid gap-5 grid-cols-1 lg:grid-cols-3">
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
    </div>
  );
};

export default EditCoursePage;
