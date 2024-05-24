import Image from "next/image";
import Session from "./components/Session";

export default function Home() {
  return (
    <main className="px-8 md:px-32 py-24">
      <div className="flex flex-col gap-y-3">
        <p className="text-center text-3xl  md:text-4xl">
          履修プランを考えることをもっと楽に
        </p>
        <p className="text-center text-2xl md:text-3xl">ClassPlannner</p>
      </div>
      <Image
        src="/images/icon.png"
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
            <p className="text-center text-xl md:text-2xl pt-4">1. 登録</p>
            <div className="flex justify-center gap-x-8 flex-col  lg:flex-row items-center">
              <p className="text-center text-lg lg:text-xl pt-4">
                新規登録をして、自分のプロフィールを編集しよう！学部名などを登録することで、
                自分の情報を元により多くの人に見てもらうことができます。ログインをしなくても、他の人のプランを見ることができます。
              </p>
              <Image
                src="/images/image2.svg"
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
              2. 履修プランを投稿
            </p>
            <div className="flex justify-center gap-x-8 flex-col  lg:flex-row items-center">
              <Image
                src="/images/image1.svg"
                alt="Register"
                width={300}
                height={300}
                className="pt-4 mx-auto rounded-full"
              />
              <p className="text-center text-lg lg:text-xl pt-4">
                現在自分が受けている授業を登録しよう！その授業の内容や感想を書くことで、他の人に情報を共有することができます。
                あなたのコメントが後輩などの参考になるかもしれません！
              </p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-b-2 border-gray-300" />
        <div className="px-8 flex justify-center gap-x-8 flex-col md:flex-row">
          <div className="lg:w-2/3">
            <p className="text-center text-xl md:text-2xl pt-4">
              3. 履修プランを更新
            </p>
            <div className="flex justify-center gap-x-8 flex-col  lg:flex-row items-center">
              <p className="text-center text-lg lg:text-xl pt-4">
                自分が受けた授業を元に履修プランをアップデートしよう！また他の人のプランにコメントを残すこともできます。
              </p>
              <Image
                src="/images/image3.svg"
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
        <p className="text-3xl text-center">
          今すぐ「ClassPlannner」をお試しください!
        </p>
        <Session />
      </div>
    </main>
  );
}
