/*
  Warnings:

  - You are about to drop the column `courseId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_courseId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "courseId",
ADD COLUMN     "planId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
