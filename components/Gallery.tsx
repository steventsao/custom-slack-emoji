"use client";
import type { ImageProps, StickersResponse } from "../utils/types";
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
      <div className="fixed bottom-0 left-0 right-0 mx-0 flex w-full flex-wrap rounded-t-lg bg-yellow-200 p-2">
        {selectedStickers.length === 0 && (
          <p className="align-center flex w-full justify-center text-center">
            Tap a sticker to start building your sheet!
          </p>
        )}
        {selectedStickers.map((stickerAction) => (
          <Image
            key={stickerAction.public_id}
            alt="sticker photo"
            className={
              "transform cursor-pointer rounded-lg transition will-change-auto group-hover:brightness-110"
            }
            style={{
              transform: `translate3d(0, 0, 0)`,
            }}
            // placeholder="blur"
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_70/${stickerAction.public_id}.png`}
            width={70}
            height={70}
            sizes="(max-width: 640px) 50vw"
          />
        ))}
        {selectedStickers.length ? (
          <div className="flex w-full justify-center">
            <button className="btn bg-sky-500 text-white hover:ring">
              Design layout
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
