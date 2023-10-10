import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps, StickersResponse } from "../utils/types";

export async function getStickers(
  nextCursor?: string
): Promise<StickersResponse> {
  // TODO still need to implement infinite scrolling using next_cursor https://support.cloudinary.com/hc/en-us/community/posts/360008223779-How-to-use-next-cursor-to-get-the-rest-of-the-files-in-a-specific-folder-
  const builder = cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("created_at", "desc")
    .max_results(100);

  if (nextCursor) {
    builder.next_cursor(nextCursor);
  }

  const results = await builder.execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: "32",
      width: "32",
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

  return { images: reducedResults, nextCursor: results.next_cursor };
}
