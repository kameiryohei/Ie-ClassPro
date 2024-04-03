import prisma from "@/utils/prisma/prismaClient";
import { NextResponse } from "next/server";
export async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

//投稿を全て取得するAPI
export async function GET(req: Request) {
  const allPosts = await prisma.post.findMany();
  return NextResponse.json(allPosts);
}
