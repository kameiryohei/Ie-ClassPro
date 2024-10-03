import { client } from "lib/client";
import { CmsData } from "./components/CmsType";
import LandingSection from "./components/LandingSection";

export default async function Home() {
  const data: CmsData = await client.get({
    endpoint: "home",
  });

  return <LandingSection data={data} />;
}
