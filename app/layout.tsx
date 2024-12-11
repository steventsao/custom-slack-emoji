import "../styles/index.css";
import { Suspense } from "react";
import { Gallery } from "@/components/Gallery";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <header className="sticky top-0 z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-stretch justify-between bg-amber-50 px-4 py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 sm:px-6">
          <Image alt="logo" src="/favicon.ico" width={32} height={32} />
          <a href="https://github.com/steventsao/custom-slack-emoji">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
        </header>

        <main className="mx-auto w-full max-w-5xl p-4">
          {children}
          <Suspense fallback={<div>loading...</div>}>
            {/* @ts-expect-error */}
            <Gallery />
          </Suspense>
        </main>
        <footer className="p-6 text-center sm:p-12">
          <a href="https://bogeybot.com">bogeybot.com</a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
