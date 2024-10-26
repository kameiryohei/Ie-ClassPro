import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

export const POST = async (req: Request) => {
  try {
    const { title, planId, auth_id } = await req.json();

    await prisma.$connect();

    // auth_idがある場合のみユーザーを検索
    const author = auth_id
      ? await prisma.user.findUnique({
          where: { auth_id: auth_id },
          select: { id: true },
        })
      : null;

    const post = await prisma.post.create({
      data: {
        title: title,
        planId: planId,
        authorId: author?.id || null, // authorが見つからない場合またはauth_idが無い場合はnull
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
