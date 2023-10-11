import EmojiInput from "@/components/EmojiInput";
import { sql } from "@vercel/postgres";
/**
 * If new sticker is not ready, keep polling for CloudinaryImage every second
 * @param props
 * @returns
 */

export const fetchCache = "force-no-store";

export default async function NewSticker(props) {
  const sticker =
    await sql`select name from "Prompt" where "vanityId" = ${props.params.slug}`;
  const loading = !sticker.rows[0];
  const userPrompt = sticker.rows[0]
    ? ""
    : `Generating ${props.params.slug}, please refresh the page in a few seconds`;
  return <EmojiInput loading={loading} />;
}
