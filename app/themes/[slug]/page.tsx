import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getThemeStickers(slug: string) {
  // Theme using related LLMModel
  const themeStickers = await prisma.theme.findFirst({
    where: {
      name: slug,
    },
    select: {
      llmModel: {
        select: {
          prompts: true,
        },
      },
    },
  });
  // LLMModel to Prompt
  // Prompt to Sticker
  //   const themes =
  //     await sql`select * from "Theme" inner join "LLMModel" on "LLMModel"."themeId" = "Theme".id`;
  console.log(themeStickers);
  return themeStickers;
}

export async function generateStaticParams() {
  const themes =
    await sql`select "Theme".name from "Theme" inner join "LLMModel" on "LLMModel"."themeId" = "Theme".id`;
  //   console.log(themes);
  const slugs = themes.rows.map((theme) => theme.name);
  //   console.log(slugs);

  return slugs.map((slug) => ({
    slug,
  }));
  // const results = await getThemeStickers();
}

export default async function Page({ params }) {
  const themeStickers = await getThemeStickers(params.slug);
  //   const images = await getThemeStickers();
  console.log(themeStickers);
  if (themeStickers === null) {
    // TODO how to use file convention https://nextjs.org/docs/app/api-reference/file-conventions/not-found
    notFound();
  }
  return (
    <div>
      {themeStickers.llmModel?.prompts.map((theme, key) => (
        <div key={key}>{theme.name}</div>
      ))}
    </div>
  );
  //   return <div><Gallery images={images}/></div>;
}
