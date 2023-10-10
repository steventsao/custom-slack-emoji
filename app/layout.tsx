import "../styles/index.css";
import { Suspense } from "react";
import { getStickers } from "utils/getStickers";
import { Gallery } from "@/components/Gallery";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import ListItem from "@/components/ListItem";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const navigationItems = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/themes/dog",
    title: "#dog",
  },
  {
    path: "/themes/desi",
    title: "#desitruck",
  },
  {
    path: "/themes/emoji",
    title: "#emoji",
  },
];
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { images, nextCursor } = await getStickers();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="See pictures from Next.js Conf and the After Party."
        />
        <meta property="og:site_name" content="nextjsconf-pics.vercel.app" />
        <meta
          property="og:description"
          content="See pictures from Next.js Conf and the After Party."
        />
        <meta property="og:title" content="Next.js Conf 2022 Pictures" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js Conf 2022 Pictures" />
        <meta
          name="twitter:description"
          content="See pictures from Next.js Conf and the After Party."
        />
      </head>
      <body className="bg-amber-50 antialiased">
        <header className="sticky top-0 z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-stretch justify-between px-4 py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 sm:px-6">
          <Image alt="logo" src="/favicon.ico" width={32} height={32} />
          sticker ideas
        </header>

        <main className="mx-auto w-full max-w-5xl p-4">
          {children}
          <Suspense>
            <Gallery images={images} />
          </Suspense>
        </main>
        <footer className="p-6 text-center sm:p-12">stickerideas.co</footer>
        <Analytics />
      </body>
    </html>
  );
}
