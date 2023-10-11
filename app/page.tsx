import { Metadata } from "next";

import EmojiInput from "@/components/EmojiInput";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "stickerideas.io",
};

export default async function Page({ params, searchParams }) {
  return <EmojiInput />;
}
