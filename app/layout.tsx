import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
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
        <main className="mx-auto max-w-[1960px] p-4">{children}</main>
        <footer className="p-6 text-center text-white/80 sm:p-12">
          stickerideas.co
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
