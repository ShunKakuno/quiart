/*
  Warnings:

  - The primary key for the `ArticleCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `ArticleCategory` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ArticleCategory` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `ArticleCategory` table. All the data in the column will be lost.
  - The primary key for the `QuizCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `QuizCategory` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `QuizCategory` table. All the data in the column will be lost.
  - Added the required column `articleId` to the `ArticleCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `ArticleCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `QuizCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_pkey",
DROP COLUMN "category",
DROP COLUMN "id",
DROP COLUMN "quizId",
ADD COLUMN     "articleId" TEXT NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY ("articleId", "categoryId");

-- AlterTable
ALTER TABLE "QuizCategory" DROP CONSTRAINT "QuizCategory_pkey",
DROP COLUMN "category",
DROP COLUMN "id",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "QuizCategory_pkey" PRIMARY KEY ("quizId", "categoryId");

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermCategory" (
    "termId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "TermCategory_pkey" PRIMARY KEY ("termId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "QuizCategory" ADD CONSTRAINT "QuizCategory_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizCategory" ADD CONSTRAINT "QuizCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleCategory" ADD CONSTRAINT "ArticleCategory_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleCategory" ADD CONSTRAINT "ArticleCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
