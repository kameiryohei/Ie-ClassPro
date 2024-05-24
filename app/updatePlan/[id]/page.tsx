import { headers } from "next/headers";
import UpdatePageCore from "./components/UpdatePageCore";
import { config } from "@/lib/config";

async function getDetailData(id: number, host: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/plan/update/${id}`);
  const data = await res.json();
  return data;
}

const UpdatePage = async ({ params }: { params: { id: number } }) => {
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
