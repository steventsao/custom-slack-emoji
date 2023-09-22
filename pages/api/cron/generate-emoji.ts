import { getRandomAdjectiveWithNoun } from "../../../utils/words";
import cloudinary from "../../../utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Disabled because cloudinary access process.env
// export const config = {
//   runtime: "edge",
// };

// Googles "Golf Terms"
// Get links from first page
// Saves to Prisma db
export default async function handler(req: NextRequest, res: NextApiResponse) {
  const randomAdjectiveWithNoun = getRandomAdjectiveWithNoun();
  const prompt = `A TOK emoji of a ${randomAdjectiveWithNoun}`;
  const output = await replicate.run(
    "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
    {
      input: {
        prompt,
      },
    }
  );
  const imageUrl = output[0];
  const result = await cloudinary.v2.uploader
    .upload(output[0], { folder: process.env.CLOUDINARY_FOLDER })
    .then((result) => result)
    .catch((err) => console.log(err));
  return res.status(200).send({
    message: randomAdjectiveWithNoun,
    output,
    prompt,
    imageUrl,
  });
}
