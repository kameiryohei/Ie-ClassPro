import { NextResponse } from "next/server";
import prisma from "@/utils/prisma/prismaClient";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, id, authorId } = await req.json();

    await prisma.$connect();
    const post = await prisma.post.create({
      data: {
        title: title,
        planId: id,
        authorId: authorId,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
