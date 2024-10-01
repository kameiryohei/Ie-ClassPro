import { NextResponse } from "next/server";
import prisma from "utils/prisma/prismaClient";

export const GET = async (req: Request, res: NextResponse) => {
  const auth_id: string = req.url.split("/user/")[1];

  try {
    await prisma.$connect();
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
