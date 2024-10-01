import Image from "next/image";
import Session from "./components/Session";
import { client } from "lib/client";
import { CmsData } from "./components/CmsType";

export default async function Home() {
  const data: CmsData = await client.get({
    endpoint: "home",
  });

  return (
    <main className="px-8 md:px-32 py-24">
      <div className="flex flex-col gap-y-3">
        <p className="text-center text-3xl  md:text-4xl">{data.title}</p>
        <p className="text-center text-2xl md:text-3xl">
          {data.applicationName}
        </p>
      </div>
      <Image
        src={data.icon?.url ?? ""}
        alt="Home"
        width={200}
        height={200}
        className="pt-4 mx-auto rounded-full"
      />
      <Session />
      <div className="mt-8 bg-slate-50 rounded-xl ring-2 ring-gray-400">
        <p className="text-center text-2xl md:text-3xl pt-4">使い方</p>
        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <div className="lg:w-2/3">
            <p className="text-center text-xl md:text-2xl pt-4">
              {data.subTitle1}
            </p>
            <div className="flex justify-center gap-x-8 flex-col  lg:flex-row items-center">
              <p className="text-center text-lg lg:text-xl pt-4">{data.text1}</p>
              <Image
                src={data.img2?.url ?? ""}
                alt="Register"
                width={300}
                height={600}
                className="pt-4"
              />
            </div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300" />
        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <div className="lg:w-2/3">
            <p className="text-center text-xl md:text-2xl pt-4">
              {data.subTitle2}
            </p>
            <div className="flex justify-center gap-x-8 flex-col  lg:flex-row items-center">
              <Image
                src={data.img1?.url ?? ""}
                alt="Register"
                width={300}
                height={300}
                className="pt-4 mx-auto rounded-full"
              />
              <p className="text-center text-lg lg:text-xl pt-4">
                {data.text2}
              </p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-b-2 border-gray-300" />
        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <div className="lg:w-2/3">
            <p className="text-center text-xl md:text-2xl pt-4">
              {data.subTitle3}
            </p>
            <div className="flex justify-center gap-x-8 flex-col  lg:flex-row items-center">
              <p className="text-center text-lg lg:text-xl pt-4">
                {data.text3}
              </p>
              <Image
                src={data.img3?.url ?? ""}
                alt="Register"
                width={300}
                height={300}
                className="pt-4 mx-auto rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <p className="text-3xl text-center">{data.lastMessage}</p>
        <Session />
      </div>
    </main>
  );
}
