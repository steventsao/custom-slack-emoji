import Replicate from "replicate";
export default async function getUrlForImageWithoutBackground(url: string) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || "",
  });
  const backgroundRemovedImageUrl = (await replicate.run(
    "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    {
      input: {
        image: url,
      },
    }
  )) as unknown as string;
  return backgroundRemovedImageUrl;
}
