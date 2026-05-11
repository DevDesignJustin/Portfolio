import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Cursor from "./components/Cursor";
import "./globals.css";

const cabinet = localFont({
  src: "../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Justin Kim",
  description: "Web Developer Portfolio",
  icons: {
    icon: "/kjustin.svg",
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
      </body>
    </html>
  );
}
