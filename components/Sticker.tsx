"use client";
import Image from "next/image";
import { useState } from "react";
import type { StickerProps } from "utils/types";

export default function Sticker({
  public_id,
  format,
  blurDataUrl,
  onStickerToggle,
}: StickerProps) {
  const [mask, setMask] = useState(false);
  const toggleMask = () => {
    setMask(!mask);
  };
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_360/${public_id}.${format}`;
  return (
    <Image
      onClick={() => {
        onStickerToggle({ imageUrl, public_id });
        toggleMask();
      }}
      alt="sticker photo"
      className={
        (mask ? "brightness-0 invert " : "") +
        "transform cursor-pointer rounded-lg transition will-change-auto group-hover:brightness-110"
      }
      style={{
        transform: `translate3d(0, 0, 0)`,
      }}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      src={imageUrl}
      width={720}
      height={480}
      sizes="(max-width: 640px) 50vw,
      (max-width: 1280px) 25vw,
      (max-width: 1536px) 25vw,
      20vw"
    />
  );
}
