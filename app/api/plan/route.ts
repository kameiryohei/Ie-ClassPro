import prisma from "utils/prisma/prismaClient";
import { NextResponse } from "next/server";
import { corsHeaders } from "../cors";

// Plan投稿用API
export const POST = async (req: Request) => {
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
export const GET = async () => {
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
    return NextResponse.json(
      { message: "Success", posts },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};

//plan投稿を1つ更新するAPI
export const PUT = async (req: Request) => {
  try {
    const { id, title, content } = await req.json();

    await prisma.$connect();
    const post = await prisma.plan.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    return NextResponse.json({ message: "Success", post });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};
