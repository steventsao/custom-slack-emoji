-- CreateTable
CREATE TABLE "CloudinaryImage" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT,
    "stickerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloudinaryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CloudinaryImage_stickerId_key" ON "CloudinaryImage"("stickerId");

-- AddForeignKey
ALTER TABLE "CloudinaryImage" ADD CONSTRAINT "CloudinaryImage_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "Sticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
