import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { TopNav } from "~/components/top-nav";
import { cn } from "~/lib/utils";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Friend's Gallery App",
  description: "Place where you can share your photos with friends.",
  keywords: [
    "gallery",
    "photos",
    "friends",
    "sharing",
    "images",
    "friends gallery",
    "friends photos",
    "friends sharing",
    "friends images",
    "friends app",
    "gallery app",
    "photos app",
    "sharing app",
    "images app",
    "friend's gallery",
    "friend's photos",
    "friend's sharing",
    "friend's images",
    "friend's app",
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body
          className={cn(
            "min-h-screen scroll-smooth font-poppins antialiased",
            font.variable,
          )}
        >
          <TopNav />
          <main className="container my-8">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
