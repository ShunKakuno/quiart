/*
  Warnings:

  - You are about to drop the column `questionId` on the `Choice` table. All the data in the column will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[quizId,index]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quizId` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_questionId_fkey";

-- DropIndex
DROP INDEX "Choice_questionId_index_key";

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "questionId",
ADD COLUMN     "quizId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "mistakeReason" TEXT NOT NULL,
    "categories" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Choice_quizId_index_key" ON "Choice"("quizId", "index");

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
