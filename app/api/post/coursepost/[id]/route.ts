import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postId = params.id;
  const CourseData = await prisma.plan.findUnique({
    where: {
      id: parseInt(postId),
    },
    select: {
      post: true, //postのみを取得
    },
  });
  return NextResponse.json(CourseData);
}
