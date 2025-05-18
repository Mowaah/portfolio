import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mohamed Bahaa | Frontend Developer",
  description:
    "Portfolio of Mohamed Bahaa, a frontend developer specializing in React, Next.js, and TypeScript",
  keywords: [
    "Mohamed Bahaa",
    "frontend developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "web developer",
    "portfolio",
    "React Native",
    "JavaScript",
    "Egypt",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Mohamed Bahaa | Frontend Developer",
    description:
      "Portfolio of Mohamed Bahaa, a frontend developer specializing in React, Next.js, and TypeScript.",
    images: [
      {
        url: "/mohabof-twitter.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Bahaa - Frontend Developer Portfolio Banner",
      },
    ],
    siteName: "Mohamed Bahaa Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Bahaa | Frontend Developer",
    description:
      "Portfolio of Mohamed Bahaa, a frontend developer specializing in React, Next.js, and TypeScript.",
    creator: "@MohaBOF",
    images: ["/twitter-default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
