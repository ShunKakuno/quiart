/*
  Warnings:

  - You are about to drop the column `tags` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "categories";

-- CreateTable
CREATE TABLE "QuizCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "QuizCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY ("id")
);
