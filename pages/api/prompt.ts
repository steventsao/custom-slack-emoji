import cloudinary from "../../utils/cloudinary";

import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});
// Gotcha https://stackoverflow.com/questions/66674834/how-to-read-formdata-in-nextjs
export const config = {
  api: {
    bodyParser: false,
  },
};
const replicateModel =
  "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({});
  const [fields] = await form.parse(req);
  const template = `A TOK emoji of an ${fields.prompt[0]}`;
  console.log(fields.prompt[0], fields.vanity_id);

  const output = await replicate.run(replicateModel, {
    input: {
      prompt: template,
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
      folder: `${process.env.CLOUDINARY_FOLDER}/emoji`,
    })
    .then((result) => result)
    .catch((err) => console.log(err));
  console.log("CREATING ENTRY: ", fields.prompt, result);

  await prisma.prompt.create({
    data: {
      // Store user prompt instead
      name: fields.prompt[0] || "No prompt",
      vanityId: fields.vanity_id[0] || "No vanity id",
      stickers: {
        create: {
          imageUrl: backgroundRemovedImageUrl,
          cloudinaryImage: {
            create: {
              publicId: result?.public_id,
            },
          },
        },
      },
    },
  });
  return res.status(200).send({
    output,
    prompt: template,
    imageUrl,
    noBg: backgroundRemovedImageUrl,
  });
}
