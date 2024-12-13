import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps, StickersResponse } from "../utils/types";
import { sql } from "@vercel/postgres";

export async function getStickers(
  nextCursor?: string
): Promise<StickersResponse> {
  const size = 15;
  const data =
    await sql`
      SELECT "CloudinaryImage"."publicId", "Prompt".name
      from "CloudinaryImage" inner join "Sticker" on "CloudinaryImage"."stickerId" = "Sticker".id
      inner join "Prompt" on "Sticker"."promptId" = "Prompt".id
      order by "CloudinaryImage"."createdAt" desc limit ${size}
    `;
  const dbImages = data.rows.map((image) => {
    return {
      id: 0,
      height: "32",
      width: "32",
      public_id: image.publicId,
      format: "png",
      prompt: image.name,
    };
  });
  // TODO still need to implement infinite scrolling using next_cursor https://support.cloudinary.com/hc/en-us/community/posts/360008223779-How-to-use-next-cursor-to-get-the-rest-of-the-files-in-a-specific-folder-
  const builder = cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("created_at", "desc")
    .max_results(size);

  // if (nextCursor) {
  //   builder.next_cursor(nextCursor);
  // }

  const results = await builder.execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of dbImages) {
    reducedResults.push({
      id: i,
      height: "32",
      width: "32",
      public_id: result.public_id,
      format: result.format,
      prompt: `:${result.prompt.toLowerCase().replaceAll(" ", "_")}`,
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
