import EmojiInput from "@/components/EmojiInput";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Gallery } from "@/components/Gallery";
import { getStickers } from "utils/getStickers";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Slack Emoji Generator",
};

export default async function Page({ params, searchParams }) {
  const { images, nextCursor } = await getStickers();
  return (
    <>
      <EmojiInput />

      <Suspense fallback={<div>loading...</div>}>
        <Gallery images={images} nextCursor={nextCursor} useCache={true} />
      </Suspense>
    </>
  );
}
