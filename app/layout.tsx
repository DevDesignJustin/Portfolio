import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Cursor from "./components/Cursor";
import "./globals.css";

const cabinet = localFont({
  src: "../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

const BASE_URL = "https://kjustin.me";

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Justin Kim — Full Stack Developer",
    template: "%s | Justin Kim",
  },
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and React. Building polished web applications and interactive experiences.",
  keywords: [
    "Justin Kim",
    "Full Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Justin Kim", url: BASE_URL }],
  creator: "Justin Kim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Justin Kim",
    title: "Justin Kim — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and React. Building polished web applications and interactive experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Kim — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and React. Building polished web applications and interactive experiences.",
    creator: "@DevDesignJustin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/kjustin.svg",
    shortcut: "/kjustin.svg",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cabinet.variable} ${mono.variable} antialiased`}>
      <body>
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
