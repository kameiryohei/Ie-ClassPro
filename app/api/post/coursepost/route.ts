import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

export const POST = async (req: Request) => {
  try {
    const { title, planId, auth_id } = await req.json();

    await prisma.$connect();

    const author = await prisma.user.findUnique({
      where: {
        auth_id: auth_id,
      },
      select: {
        id: true,
      },
    });

    const post = await prisma.post.create({
      data: {
        title: title,
        planId: planId,
        authorId: author?.id,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
