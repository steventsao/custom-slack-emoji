-- CreateTable
CREATE TABLE "Sticker" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LabelToSticker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LabelToSticker_AB_unique" ON "_LabelToSticker"("A", "B");

-- CreateIndex
CREATE INDEX "_LabelToSticker_B_index" ON "_LabelToSticker"("B");

-- AddForeignKey
ALTER TABLE "_LabelToSticker" ADD CONSTRAINT "_LabelToSticker_A_fkey" FOREIGN KEY ("A") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToSticker" ADD CONSTRAINT "_LabelToSticker_B_fkey" FOREIGN KEY ("B") REFERENCES "Sticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
