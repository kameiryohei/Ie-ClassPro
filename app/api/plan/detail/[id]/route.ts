import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth_id = params.id;
  const CourseDetailData = await prisma.user.findUnique({
    where: {
      auth_id: auth_id,
    },
    include: {
      plans: true,
    },
  });
  return NextResponse.json(CourseDetailData);
}
