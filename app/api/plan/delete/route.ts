import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

// 自分が作成したプランを削除するAPI

export const DELETE = async (req: Request) => {
  try {
    const { planId } = await req.json();

    await prisma.$connect();

    // 関連するCourseとPostを削除
    await prisma.course.deleteMany({
      where: {
        planId: planId,
      },
    });

    await prisma.post.deleteMany({
      where: {
        planId: planId,
      },
    });

    // その後でPlanを削除
    const plan = await prisma.plan.delete({
      where: {
        id: planId,
      },
    });

    return NextResponse.json(
      { message: "Deleted successfully", plan },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
