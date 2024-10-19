import { headers } from "next/headers";
import { config } from "lib/config";
import EditPlanCore from "./components/EditPlanCore";
import { GetDetailCourseDataResponse } from "./types";

async function getDetailCourseData(
  id: string,
  host: string
): Promise<GetDetailCourseDataResponse> {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan/detail/${id}`, {
    cache: "no-store", //ssr
    method: "GET",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "" },
  });
  const data = await res.json();
  return data;
}

const EditCoursePage = async ({ params }: { params: { id: string } }) => {
  const host = headers().get("host");

  const SpecificCourseDate = await getDetailCourseData(params.id, host!);

  return <EditPlanCore SpecificCourseDate={SpecificCourseDate} />;
};

export default EditCoursePage;
