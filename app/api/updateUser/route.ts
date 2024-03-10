// pages/api/updateUser.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, universityName, facultyName } = req.body;

    // データベースに保存するロジックをここに書く
    const result = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        universityName: universityName,
        facultyName: facultyName,
      },
    });

    res.json(result);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
