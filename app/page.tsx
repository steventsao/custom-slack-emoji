import { Suspense } from "react";
import { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import EmojiInput from "@/components/EmojiInput";
import { getStickers } from "utils/getStickers";

export const metadata: Metadata = {
  title: "stickerideas.io",
};

export default async function Page({ params, searchParams }) {
  // @ts-ignore
  const maybeNextCursor = searchParams?.nextCursor;
  const { images, nextCursor } = await getStickers(maybeNextCursor);
  return (
    <>
      <Suspense fallback={<p>Loading stickers...</p>}>
        <EmojiInput />
        <Gallery images={images} />
      </Suspense>
    </>
  );
}
