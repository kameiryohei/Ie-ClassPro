import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

// post投稿用API
export const POST = async (req: Request) => {
  try {
    const { title, content, authorId } = await req.json();

    await prisma.$connect();
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
export const DELETE = async (req: Request) => {
  try {
    const { postId } = await req.json();

    await prisma.$connect();
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json(
      { message: "Deleted successfully", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
