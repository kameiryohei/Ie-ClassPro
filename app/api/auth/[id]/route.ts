import { NextRequest, NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

//サーバーサイドからプロフィール情報を取得するAPI(動作確認済み)
export const GET = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    const auth_id: string = req.url.split("/auth/")[1];
    const user = await prisma.user.findUnique({
      where: { auth_id },
      select: {
        id: true,
        auth_id: true,
        name: true,
        email: true,
        university: true,
        faculty: true,
        department: true,
        grade: true,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
