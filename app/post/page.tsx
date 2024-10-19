import Link from "next/link";
import UserPostList from "./components/UserPostList";
import { config } from "lib/config";
import { headers } from "next/headers";
import { Posts } from "./types/PostType";
import useSeverUser from "app/hooks/useSeverUser";

async function getUserPost(host: string, id: string): Promise<Posts[]> {
  const res = await fetch(`${config.apiPrefix}${host}/api/post/${id}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  });
  const data = await res.json();
  return data.posts;
}

const AddPostPage = async () => {
  const host = headers().get("host");
  const { session } = useSeverUser();
  const id = await session();
  const data = await getUserPost(host!, id!);
  return (
    <main className="px-12 lg:px-48 mx-auto p-6">
      <p className="font-semibold text-center text-xl md:text-3xl">
        <span className="border-b-4 border-orange-500 inline-block">
          これまで投稿したレビュー
        </span>
      </p>
      <UserPostList data={data} />
      <Link
        href="/profile"
        className="text-orange-500 text-2xl font-semibold hover:underline mt-8 text-center block"
      >
        戻る
      </Link>
    </main>
  );
};

export default AddPostPage;
