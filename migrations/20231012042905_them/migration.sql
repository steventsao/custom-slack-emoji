-- DropForeignKey
ALTER TABLE "CloudinaryImage" DROP CONSTRAINT "CloudinaryImage_stickerId_fkey";

-- AddForeignKey
ALTER TABLE "CloudinaryImage" ADD CONSTRAINT "CloudinaryImage_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "Sticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
