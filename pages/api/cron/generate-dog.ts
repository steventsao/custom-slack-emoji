import getRandomDogBreed from "utils/dogBreeds";
import OpenAI from "openai";
import getRandomAdjectiveWithNoun from "../../../utils/words-animals";
import getUrlForImageWithoutBackground from "utils/removeBackground";
// import cloudinary from "../../../utils/cloudinary";
// import { createCanvas, loadImage } from "canvas";
import { NextRequest } from "next/server";
import assert from "assert";
import cloudinary from "utils/cloudinary";
// import { NextApiResponse } from "next";
// import Replicate from "replicate";
// import { PrismaClient } from "@prisma/client";
// import { get } from "http";

// const prisma = new PrismaClient();
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN || "",
// });
// const replicateModel =
//   "vikrum/desi-truck-style:cd7103037b8315b689487bb81dcf3f71a36e2607c6dd116b11bb5b47e8b7bfd8";

// Disabled because cloudinary access process.env
// export const config = {
//   runtime: "edge",
// };

// Googles "Golf Terms"
// Get links from first page
// Saves to Prisma db
export default async function handler(req: NextRequest, res) {
  // https://platform.openai.com/docs/libraries/node-js-library
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

  const dogBreed = getRandomDogBreed();
  const template = `a portrait of a ${dogBreed} dog in a white background`;
  try {
    const response = await openai.images.generate({
      prompt: template,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data[0].url;
    // select a dog breed
    // use prompt template in dalle API
    // remove background in replicate
    // upload to cloudinary
    // save to prisma
    // add theme to db
    assert(image_url, "image_url is undefined");

    const uploadUrl = await getUrlForImageWithoutBackground(image_url);
    console.log(uploadUrl);
    const result = await cloudinary.v2.uploader
      .upload(uploadUrl, {
        folder: `${process.env.CLOUDINARY_FOLDER}/dog`,
      })
      .then((result) => result)
      .catch((err) => console.log(err));
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(e);
  }
}
