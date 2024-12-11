import EmojiInput from "@/components/EmojiInput";
import { sql } from "@vercel/postgres";
/**
 * If new sticker is not ready, keep polling for CloudinaryImage every second
 * @param props
 * @returns
 */

export const fetchCache = "force-no-store";

export default async function NewSticker(props) {
  const { slug } = await props.params;
  const sticker =
    await sql`select name from "Prompt" where "vanityId" = ${slug}`;
  const loading = !sticker.rows[0];
  return <EmojiInput loading={loading} placeholder={sticker.rows[0]?.name} />;
}
