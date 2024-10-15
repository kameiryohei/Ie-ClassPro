import useSeverUser from "app/hooks/useSeverUser";
import { config } from "lib/config";
import { headers } from "next/headers";
import ProfileCard from "./ProfileCard";
import ProfileOptionsCard from "./ProfileOptionsCard";

async function getUserDate(host: string, id: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/auth/${id}`, {
    cache: "no-store",
    method: "GET",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "" },
  });
  const data = await res.json();
  return data.user;
}

const ProfileContent = async () => {
  const { session } = useSeverUser();
  const userId = await session();
  const host = headers().get("host");
  const data = await getUserDate(host!, userId!);
  const id = data.id;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ProfileCard data={data} />
      <ProfileOptionsCard id={id} />
    </div>
  );
};

export default ProfileContent;
