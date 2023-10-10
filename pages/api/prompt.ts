import getRandomAdjectiveWithNoun from "../../utils/words-animals";
import cloudinary from "../../utils/cloudinary";
import { createCanvas, loadImage } from "canvas";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import Replicate from "replicate";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});
const replicateModel =
  "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e";
export default async function handler(req: NextRequest, res: NextApiResponse) {
  const data = await req.body;
  console.log(data);
}
