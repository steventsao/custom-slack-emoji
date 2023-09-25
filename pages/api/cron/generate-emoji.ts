import { getRandomAdjectiveWithNoun } from "../../../utils/words";
import cloudinary from "../../../utils/cloudinary";
import { createCanvas, loadImage } from "canvas";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import Replicate from "replicate";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});
const replicateModel =
  "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e";

// Disabled because cloudinary access process.env
// export const config = {
//   runtime: "edge",
// };

// Googles "Golf Terms"
// Get links from first page
// Saves to Prisma db
export default async function handler(req: NextRequest, res: NextApiResponse) {
  const llmModel = await prisma.lLMModel.findFirst({
    where: {
      name: replicateModel,
    },
  });
  if (llmModel?.id === undefined) {
    throw new Error("No model found");
  }
  const randomAdjectiveWithNoun = getRandomAdjectiveWithNoun();
  const prompt = `A TOK emoji of a ${randomAdjectiveWithNoun}`;
  const output = await replicate.run(replicateModel, {
    input: {
      prompt,
    },
  });
  const imageUrl = output[0];
  const backgroundRemovedImageUrl = (await replicate.run(
    "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    {
      input: {
        image: output[0],
      },
    }
  )) as unknown as string;
  const result = await cloudinary.v2.uploader
    .upload(backgroundRemovedImageUrl, {
      folder: process.env.CLOUDINARY_FOLDER,
    })
    .then((result) => result)
    .catch((err) => console.log(err));
  await prisma.prompt.create({
    data: {
      name: prompt,
      model: {
        connect: {
          id: llmModel.id,
        },
      },
      stickers: {
        create: {
          imageUrl: backgroundRemovedImageUrl,
        },
      },
    },
  });
  //   const promptId = await sql`INSERT INTO "Prompt" (name) VALUES (${prompt})`;
  //   console.log(promptId, "PROMPT ID");
  //   await sql`INSERT INTO "Sticker" ("imageUrl") VALUES (${backgroundRemovedImageUrl})`;

  return res.status(200).send({
    message: randomAdjectiveWithNoun,
    output,
    prompt,
    imageUrl,
    noBg: backgroundRemovedImageUrl,
  });
}
