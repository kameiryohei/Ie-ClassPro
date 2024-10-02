import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

//編集画面で教科を削除するための関数　app/updatePlan/[id]/EditCorseList.tsxで使用
export const DELETE = async (req: Request) => {
  try {
    const { courseId } = await req.json();

    await prisma.$connect();
    const post = await prisma.course.delete({
      where: {
        id: courseId,
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

//編集画面で教科を編集するための関数　app/updatePlan/[id]/page.tsxで使用
export const PUT = async (req: Request) => {
  try {
    const { courseId, name, content } = await req.json();

    await prisma.$connect();
    const courses = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        name,
        content,
      },
    });
    return NextResponse.json(
      { message: "Updated successfully", courses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
