import EmojiInput from "@/components/EmojiInput";
import { sql } from "@vercel/postgres";
/**
 * If new sticker is not ready, keep polling for CloudinaryImage every second
 * @param props
 * @returns
 */

export default async function NewSticker(props) {
  const sticker =
    await sql`select name from "Prompt" where "vanityId" = ${props.params.slug}`;
  console.log(sticker.rows[0]);
  return (
    <>
      <EmojiInput />
    </>
  );
}
