"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

const Page = () => {
  const supabase = createClientComponentClient();
  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
      console.log(data);
    }
    getData();
  }, []);

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
          <form action="/api/auth/logout" method="post">
            <Button type="submit">ログアウト</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
