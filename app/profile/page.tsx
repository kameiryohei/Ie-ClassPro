"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

/*ログイン後のマイページ*/
const MyPage = () => {
  const supabase = createClientComponentClient();
  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
      console.log(data);
    }
    getData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold">ログインに成功しました</h1>
      <div className="pt-10">
        <form action="/api/auth/logout" method="post">
          <Button type="submit">ログアウト</Button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
