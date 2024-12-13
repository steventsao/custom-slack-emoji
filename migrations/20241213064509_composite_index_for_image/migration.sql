-- DropIndex
DROP INDEX "CloudinaryImage_createdAt_idx";

-- DropIndex
DROP INDEX "CloudinaryImage_stickerId_idx";

-- CreateIndex
CREATE INDEX "CloudinaryImage_createdAt_stickerId_publicId_idx" ON "CloudinaryImage"("createdAt" DESC, "stickerId", "publicId");
