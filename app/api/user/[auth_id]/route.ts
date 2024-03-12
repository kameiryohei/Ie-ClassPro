import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/utils/prisma/prismaClient";
import toast from "react-hot-toast";

export async function dbConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}
export const GET = async (req: Request, res: NextResponse) => {
  const auth_id: string = req.url.split("/user/")[1];
  console.log(auth_id);

  try {
    await dbConnect();
    const user = await prisma.user.findUnique({
      where: { auth_id },
      include: {
        posts: true,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
