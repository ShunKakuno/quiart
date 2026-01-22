-- CreateTable
CREATE TABLE "Terms" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TEXT NOT NULL DEFAULT '0',
    "view" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);
