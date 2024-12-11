"use client";
import Image from "next/image";
import type { StickerProps } from "utils/types";
const downloadSticker = (public_id: string, format: string, prompt: string) => {
  // replace the leading ':' if there is one
  const trimmedPrompt = prompt.replace(/^:/, "");
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${public_id}.${format}`;
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${trimmedPrompt || 'sticker'}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
};


const DEFAULT_DIMENSION = 32;
export default function Sticker({ prompt, public_id, format }: StickerProps) {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_32/${public_id}.${format}`;
  return (
    <button
      className="space-between flex flex-row gap-2 hover:bg-yellow-200 px-3 py-2 rounded-lg"
      onClick={() => downloadSticker(public_id, format, prompt)}
    >
      <div>
        <Image
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
    </button>
  );
}
