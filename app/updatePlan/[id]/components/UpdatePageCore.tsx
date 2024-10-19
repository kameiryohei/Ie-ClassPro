import { CourseType } from "app/allPost/[id]/types/Course";
import EditCorseList from "./EditCorseList";
import AddCourse from "./AddCourse";
import { UserType } from "../components/index";
import UpdatePlanName from "./UpdatePlanName";
import useSeverUser from "app/hooks/useSeverUser";
import { redirect } from "next/navigation";
import PageBackButton from "./PageBackButton";

export interface UpdatePageCoreProps {
  paramsId: string;
  title: string;
  content: string;
  courses: CourseType[];
  userData: UserType;
}

const UpdatePageCore = async ({
  paramsId,
  title,
  content,
  courses,
  userData,
}: UpdatePageCoreProps) => {
  const { session } = useSeverUser();
  const sessionId = await session();
  if (sessionId !== userData.auth_id) {
    redirect("/profile");
  }

  return (
    <div className="py-8 px-10 md:px-36 relative">
      <PageBackButton />

      <p className="text-xl font-medium md:text-2xl text-center">
        プラン編集画面
      </p>
      <UpdatePlanName title={title} content={content} paramsId={paramsId} />

      <div className="p-4 flex flex-col gap-y-2 mt-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-400">
        <p className="text-lg font-medium md:text-xl text-center underline">
          現在登録中の教科一覧
        </p>
        <div className="grid lg:grid-cols-2 gap-4 pt-2">
          {courses.map((course: CourseType) => (
            <EditCorseList
              key={course.id}
              id={course.id}
              name={course.name}
              content={course.content}
            />
          ))}
        </div>

        <p className="text-lg font-medium md:text-xl text-center underline">
          教科を追加する
        </p>
        <AddCourse planId={Number(paramsId)} />
      </div>
    </div>
  );
};

export default UpdatePageCore;
