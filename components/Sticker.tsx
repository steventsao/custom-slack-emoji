"use client";
import Image from "next/image";
import type { StickerProps } from "utils/types";

const DEFAULT_DIMENSION = 32;
export default function Sticker({ prompt, public_id, format }: StickerProps) {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_32/${public_id}.${format}`;
  return (
    <a
      className="space-between flex flex-row gap-2"
      href={imageUrl}
      download={prompt}
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <Image
          onClick={() => {}}
          alt="sticker photo"
          className="flex-1 cursor-pointer rounded-lg transition will-change-auto group-hover:brightness-110"
          src={imageUrl}
          width={DEFAULT_DIMENSION}
          height={DEFAULT_DIMENSION}
        />
      </div>
      <span className="inline-block flex-1 whitespace-nowrap text-start align-middle">
        {prompt}
      </span>
    </a>
  );
}
