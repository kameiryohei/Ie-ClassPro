import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const courseId = params.id;
  const CourseData = await prisma.plan.findUnique({
    where: {
      id: parseInt(courseId),
    },
    include: {
      user: true,
      courses: true,
      post: true,
    },
  });
  return NextResponse.json(CourseData);
}
