-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "qiitaId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tag" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
