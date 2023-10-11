import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";
import cloudinary from "utils/cloudinary";
import { ImageProps } from "../../../utils/types";
import getBase64ImageUrl from "../../../utils/generateBlurPlaceholder";

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
  //   const images = await getThemeStickers();
  //   console.log(themeStickers);
  // TODO how to use file convention https://nextjs.org/docs/app/api-reference/file-conventions/not-found
  notFound();
}
