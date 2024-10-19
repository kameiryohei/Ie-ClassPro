import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

// ユーザーが投稿したレビューを取得するAPI
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth_id = params.id;
  const data = await prisma.user.findUnique({
    where: {
      auth_id: auth_id,
    },
    select: {
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  return NextResponse.json(data);
}
