/*
  Warnings:

  - A unique constraint covering the columns `[vanityId]` on the table `Prompt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "vanityId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Prompt_vanityId_key" ON "Prompt"("vanityId");
