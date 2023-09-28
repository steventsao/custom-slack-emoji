import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react";
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
        <NavigationMenu className="mx-5 font-bold">
          <NavigationMenuList>
            {navigationItems.map((item, key) => (
              <NavigationMenuItem key={key}>
                <Link href={item.path} legacyBehavior passHref>
                  <NavigationMenuLink className="text-xl">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <main className="mx-auto max-w-[1960px] p-4">{children}</main>
        <footer className="p-6 text-center sm:p-12">stickerideas.co</footer>
        <Analytics />
      </body>
    </html>
  );
}
