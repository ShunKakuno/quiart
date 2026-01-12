/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `Choice` table. All the data in the column will be lost.
  - Added the required column `correctQuizId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "isCorrect";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "correctQuizId" TEXT NOT NULL;
