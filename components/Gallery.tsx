import Image from "next/image";
import type { ImageProps, StickersResponse } from "../utils/types";

export function Gallery({ images }: { images: ImageProps[] }) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-6">
      {images.map(({ id, public_id, format, blurDataUrl }) => (
        // <Link
        //   key={id}
        //   href={`/?photoId=${id}`}
        //   as={`/p/${id}`}
        //   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
        //   shallow
        //   className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        // >

        <Image
          key={id}
          alt="sticker photo"
          className="transform rounded-lg transition will-change-auto group-hover:brightness-110"
          style={{
            transform: `translate3d(0, 0, 0)`,
          }}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_360/t_sticker-outline/${public_id}.${format}`}
          width={720}
          height={480}
          sizes="(max-width: 640px) 50vw,
            (max-width: 1280px) 25vw,
            (max-width: 1536px) 25vw,
            20vw"
        />
        // </Link>
      ))}
    </div>
  );
}
