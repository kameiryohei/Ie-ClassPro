import prisma from "@/utils/prisma/prismaClient";
import { NextResponse } from "next/server";
import { doConnect } from "../plan/route";

//授業の科目が配列として送られてくるので、それを受け取ってDBに保存する
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { courses, planId } = await req.json();

    await doConnect();
    const post = await prisma.course.createMany({
      data: courses,
    });
    return NextResponse.json({ message: "Success", post }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};
