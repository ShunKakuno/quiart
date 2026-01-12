/*
  Warnings:

  - Added the required column `selectId` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "selectId" TEXT NOT NULL;
