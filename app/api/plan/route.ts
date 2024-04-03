import prisma from "@/utils/prisma/prismaClient";
import { NextResponse } from "next/server";
import { doConnect } from "../post/route";

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
//plan投稿を全て取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await doConnect();
    const posts = await prisma.plan.findMany();
    return NextResponse.json({ message: "Success", posts });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};
