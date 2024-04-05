import prisma from "@/utils/prisma/prismaClient";
import { NextResponse } from "next/server";

//投稿を全て取得するAPI
export async function GET(req: Request) {
  const allPosts = await prisma.post.findMany();
  return NextResponse.json(allPosts);
}
