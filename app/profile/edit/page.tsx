import useSeverUser from "app/hooks/useSeverUser";
import EditProfileContent from "./components/EditProfileContent";
import { headers } from "next/headers";
import { getUserDate } from "../components/ProfileContent";

const EditProfilePage = async () => {
  const { session } = useSeverUser();
  const userId = await session();
  const host = headers().get("host");
  const data = await getUserDate(host!, userId!);

  return <EditProfileContent data={data} host={host} />;
};

export default EditProfilePage;
