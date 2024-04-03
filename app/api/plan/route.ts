import prisma from "@/utils/prisma/prismaClient";
import { NextResponse } from "next/server";
export async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

// Plan投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, content, userId } = await req.json();

    await doConnect();
    const post = await prisma.plan.create({
      data: {
        title,
        content,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Success", post, planId: post.id },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};
