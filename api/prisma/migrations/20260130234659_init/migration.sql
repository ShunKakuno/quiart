/*
  Warnings:

  - You are about to drop the column `category` on the `Terms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Terms" DROP COLUMN "category";

-- AddForeignKey
ALTER TABLE "TermCategory" ADD CONSTRAINT "TermCategory_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermCategory" ADD CONSTRAINT "TermCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
