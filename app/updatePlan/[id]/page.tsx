import { headers } from "next/headers";
import UpdatePageCore from "./components/UpdatePageCore";
import { config } from "lib/config";
import { SpecificPlanType } from "./components";

async function getDetailData(
  id: string,
  host: string
): Promise<SpecificPlanType> {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan/update/${id}`, {
    cache: "no-store", //ssr
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  });
  const data = await res.json();
  return data;
}

const UpdatePage = async ({ params }: { params: { id: string } }) => {
  const host = headers().get("host");
  const uniqueDate = await getDetailData(params.id, host!);
  const { title, content, courses, user } = uniqueDate;

  return (
    <UpdatePageCore
      paramsId={params.id}
      title={title}
      content={content}
      courses={courses}
      userData={user}
    />
  );
};

export default UpdatePage;
