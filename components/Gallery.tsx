"use client";
import type { ImageProps, StickersResponse } from "../utils/types";
import { Cloudinary } from "@cloudinary/url-gen";

import Sticker from "@/components/Sticker";
import type { StickerAction } from "utils/types";
import { useState } from "react";
import Image from "next/image";

export function Gallery({ images }: { images: ImageProps[] }) {
  const [selectedStickers, setSelectedStickers] = useState<StickerAction[]>([]);
  const handleStickerToggle = (stickerAction: StickerAction) => {
    console.log(stickerAction);
    setSelectedStickers([...selectedStickers, stickerAction]);
  };
  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-6">
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <Sticker
            key={id}
            public_id={public_id}
            format={format}
            blurDataUrl={blurDataUrl || ""}
            onStickerToggle={handleStickerToggle}
          />
          // <Link
          //   key={id}
          //   href={`/?photoId=${id}`}
          //   as={`/p/${id}`}
          //   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
          //   shallow
          //   className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          // >

          // TODO add border with
          //   src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_360/t_sticker-outline/${public_id}.${format}`}
          // TODO is there a CSS way to hide the clear image?

          // </Link>
        ))}
      </div>
    </>
  );
}
