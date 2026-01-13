/*
  Warnings:

  - You are about to drop the column `tag` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];
