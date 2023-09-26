import Image from "next/image";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";

import { Metadata } from "next";

async function getStickers(): Promise<ImageProps[]> {
  // TODO still need to implement infinite scrolling using next_cursor https://support.cloudinary.com/hc/en-us/community/posts/360008223779-How-to-use-next-cursor-to-get-the-rest-of-the-files-in-a-specific-folder-
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(300)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
  // generate random number from -20 to 20
  for (let i = 0; i < reducedResults.length; i++) {
    // const randomRotation = Math.floor(Math.random() * 20) - 10;
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
    // Rotation can hurt caching
    // reducedResults[i].rotation = randomRotation;
  }

  return reducedResults;
}
export const metadata: Metadata = {
  title: "stickerideas.io",
};

export default async function Page() {
  const images = await getStickers();

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
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
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        stickerideas.co
      </footer>
    </>
  );
}
