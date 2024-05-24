import { headers } from "next/headers";
import { config } from "@/lib/config";
import EditPlanCore from "./components/EditPlanCore";

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

  return <EditPlanCore SpecificCourseDate={SpecificCourseDate} />;
};

export default EditCoursePage;
