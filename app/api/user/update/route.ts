import { NextResponse } from "next/server";
import { doConnect } from "../../post/route";
import prisma from "@/utils/prisma/prismaClient";

// username更新用API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { name, auth_id, university, faculty, department, grade } =
      await req.json();
    await doConnect();
    const post = await prisma.user.update({
      data: {
        name,
      },
      where: {
        auth_id,
        university,
        faculty,
        department,
        grade,
      },
    });

    return NextResponse.json(
      { message: "Deleted successfully", post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  } finally {
    await prisma.$disconnect();
  }
};

//ユーザーを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const { auth_id } = await req.json();
    await doConnect();
    await prisma.user.delete({
      where: {
        auth_id,
      },
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 503 });
  } finally {
    await prisma.$disconnect();
  }
};
