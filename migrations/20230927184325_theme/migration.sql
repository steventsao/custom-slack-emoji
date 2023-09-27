/*
  Warnings:

  - A unique constraint covering the columns `[themeId]` on the table `LLMModel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LLMModel" ADD COLUMN     "themeId" INTEGER;

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LLMModel_themeId_key" ON "LLMModel"("themeId");

-- AddForeignKey
ALTER TABLE "LLMModel" ADD CONSTRAINT "LLMModel_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
