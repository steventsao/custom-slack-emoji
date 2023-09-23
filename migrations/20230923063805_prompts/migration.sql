-- AlterTable
ALTER TABLE "Sticker" ADD COLUMN     "promptId" INTEGER;

-- CreateTable
CREATE TABLE "LLMModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LLMModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "modelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LLMModelToPrompt" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LLMModelToPrompt_AB_unique" ON "_LLMModelToPrompt"("A", "B");

-- CreateIndex
CREATE INDEX "_LLMModelToPrompt_B_index" ON "_LLMModelToPrompt"("B");

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LLMModelToPrompt" ADD CONSTRAINT "_LLMModelToPrompt_A_fkey" FOREIGN KEY ("A") REFERENCES "LLMModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LLMModelToPrompt" ADD CONSTRAINT "_LLMModelToPrompt_B_fkey" FOREIGN KEY ("B") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
