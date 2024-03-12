"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";

const Page = () => {
  const { signOut } = useUser();
  const router = useRouter();
  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold mb-5">プロフィール画面</h1>
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg">
        <div className="">
          <p className="font-light mb-4">ユーザー名:</p>
          <Input type="text" className="shadow-lg" />
        </div>
        <div>
          <p className="font-light m-4">学部名:</p>
          <Input type="text" className="shadow-lg" />
        </div>
        <Button className="mt-5">更新</Button>

        <div className="pt-10">
          <Button
            onClick={() => logout()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
