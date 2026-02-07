CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- AlterTable
ALTER TABLE "Terms" ADD COLUMN     "term_normalized" TEXT;

-- CreateIndex
CREATE INDEX "idx_terms_trgm" ON "Terms" USING GIN ("term_normalized" gin_trgm_ops);
