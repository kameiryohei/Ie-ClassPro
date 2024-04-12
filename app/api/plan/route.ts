import prisma from "@/utils/prisma/prismaClient";
import { NextResponse } from "next/server";

// Plan投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, content, userId } = await req.json();

    await prisma.$connect();
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
    await prisma.$connect();
    const posts = await prisma.plan.findMany({
      include: {
        user: {
          select: {
            name: true,
            university: true,
          },
        },
      },
    });
    return NextResponse.json({ message: "Success", posts });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};
