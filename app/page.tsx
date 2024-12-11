import EmojiInput from "@/components/EmojiInput";
import type { Metadata } from "next";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slack Emoji Generator",
};

export default async function Page({ params, searchParams }) {
  return <EmojiInput />;
}
