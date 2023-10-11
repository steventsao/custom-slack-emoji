"use client";
import Image from "next/image";
import type { StickerProps } from "utils/types";

const DEFAULT_DIMENSION = 32;
export default function Sticker({ prompt, public_id, format }: StickerProps) {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_32/${public_id}.${format}`;
  return (
    <div className="flex flex-row content-center gap-2">
      <Image
        onClick={() => {}}
        alt="sticker photo"
        className="cursor-pointer rounded-lg transition will-change-auto group-hover:brightness-110"
        src={imageUrl}
        width={DEFAULT_DIMENSION}
        height={DEFAULT_DIMENSION}
      />
      <span className="inline-block text-center align-middle">{prompt}</span>
    </div>
  );
}
