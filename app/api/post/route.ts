import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient() as any;
export async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

// post投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, content, authorId } = await req.json();

    await doConnect();
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
