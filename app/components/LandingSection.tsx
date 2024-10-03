import Image from "next/image";
import { CmsData } from "./CmsType";
import Session from "./Session";

interface LandingSectionProps {
  data: CmsData;
}

const LandingSection = ({ data }: LandingSectionProps) => {
  return (
    <main className="px-8 md:px-32 py-24">
      <section>
        <div className="flex flex-col gap-y-3">
          <h1 className="text-center text-3xl md:text-4xl">{data.title}</h1>
          <h2 className="text-center text-2xl md:text-3xl">
            {data.applicationName}
          </h2>
        </div>
        <Image
          src={data.icon?.url ?? ""}
          alt="Home"
          width={200}
          height={200}
          className="pt-4 mx-auto rounded-full"
        />
      </section>

      <Session />

      <section className="mt-8 bg-slate-50 rounded-xl ring-2 ring-gray-400">
        <h2 className="text-center text-2xl md:text-3xl pt-4">使い方</h2>

        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <article className="lg:w-2/3">
            <h3 className="text-center text-xl md:text-2xl pt-4">
              {data.subTitle1}
            </h3>
            <div className="flex justify-center gap-x-8 flex-col lg:flex-row items-center">
              <p className="text-center text-lg lg:text-xl pt-4">
                {data.text1}
              </p>
              <Image
                src={data.img2?.url ?? ""}
                alt="Register"
                width={300}
                height={600}
                className="pt-4"
              />
            </div>
          </article>
        </div>

        <div className="border-b-2 border-gray-300" />

        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <article className="lg:w-2/3">
            <h3 className="text-center text-xl md:text-2xl pt-4">
              {data.subTitle2}
            </h3>
            <div className="flex justify-center gap-x-8 flex-col lg:flex-row items-center">
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
          </article>
        </div>

        <div className="pt-4 border-b-2 border-gray-300" />

        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <article className="lg:w-2/3">
            <h3 className="text-center text-xl md:text-2xl pt-4">
              {data.subTitle3}
            </h3>
            <div className="flex justify-center gap-x-8 flex-col lg:flex-row items-center">
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
          </article>
        </div>
      </section>

      <div className="pt-8">
        <h2 className="text-3xl text-center">{data.lastMessage}</h2>
        <Session />
      </div>
    </main>
  );
};

export default LandingSection;
