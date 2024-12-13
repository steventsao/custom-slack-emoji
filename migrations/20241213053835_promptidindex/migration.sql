-- DropIndex
DROP INDEX "CloudinaryImage_createdAt_idx";

-- CreateIndex
CREATE INDEX "CloudinaryImage_createdAt_idx" ON "CloudinaryImage"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Sticker_promptId_idx" ON "Sticker"("promptId");
