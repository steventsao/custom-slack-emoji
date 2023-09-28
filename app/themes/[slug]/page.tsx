import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";
import cloudinary from "utils/cloudinary";
import { ImageProps } from "../../../utils/types";
import getBase64ImageUrl from "../../../utils/generateBlurPlaceholder";

const prisma = new PrismaClient();

// TODO dynamically import theh description of a slug?
// https://github.com/vercel/next.js/discussions/11291#discussioncomment-4303

async function getThemeStickers(slug: string) {
  // Theme using related LLMModel
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/${slug}/*`)
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();
  //   const themeStickers = await prisma.theme.findFirst({
  //     where: {
  //       name: slug,
  //     },
  //     select: {
  //       llmModel: {
  //         select: {
  //           prompts: true,
  //         },
  //       },
  //     },
  //   });
  // LLMModel to Prompt
  // Prompt to Sticker
  //   const themes =
  //     await sql`select * from "Theme" inner join "LLMModel" on "LLMModel"."themeId" = "Theme".id`;
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

  return { images: reducedResults, nextCursor: results.next_cursor };
}

// export async function generateStaticParams() {
//   const themes =
//     await sql`select "Theme".name from "Theme" inner join "LLMModel" on "LLMModel"."themeId" = "Theme".id`;
//   //   console.log(themes);
//   const slugs = themes.rows.map((theme) => theme.name);

//   //   TODO does this help with sitemap?
//   return slugs.map((slug) => ({
//     slug,
//   }));
// }

export default async function Page({ params }) {
  const themeStickers = await getThemeStickers(params.slug);
  //   const images = await getThemeStickers();
  //   console.log(themeStickers);
  if (!themeStickers.images.length) {
    // TODO how to use file convention https://nextjs.org/docs/app/api-reference/file-conventions/not-found
    notFound();
  }
  return <Gallery images={themeStickers.images} />;
}
