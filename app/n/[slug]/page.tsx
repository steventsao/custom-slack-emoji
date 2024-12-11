import EmojiInput from "@/components/EmojiInput";
import { sql } from "@vercel/postgres";
import { Gallery } from "@/components/Gallery";
import { Suspense } from "react";
import { getStickers } from "utils/getStickers";
/**
 * If new sticker is not ready, keep polling for CloudinaryImage every second
 * @param props
 * @returns
 */

export const fetchCache = "force-no-store";

export default async function NewSticker(props) {
  const { images, nextCursor } = await getStickers();
  const { slug } = await props.params;
  const sticker =
    await sql`select name from "Prompt" where "vanityId" = ${slug}`;
  const loading = !sticker.rows[0];
  return (
    <>
      <EmojiInput loading={loading} placeholder={sticker.rows[0]?.name} />
      <Suspense fallback={<div>loading...</div>}>
        <Gallery images={images} nextCursor={nextCursor} />
      </Suspense>
    </>
  );
}
