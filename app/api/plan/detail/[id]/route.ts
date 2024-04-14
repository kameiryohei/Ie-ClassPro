import { NextResponse } from "next/server";
import prisma from "@/utils/prisma/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const CourseDetailData = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      plans: true,
    },
  });
  return NextResponse.json(CourseDetailData);
}
