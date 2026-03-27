import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attune — Skill is forged, not taught.",
  description:
    "A program for practitioners done with generic advice. Install the ecological dynamics operating system and rebuild your practice from it.",
  openGraph: {
    title: "Attune — Skill is forged, not taught.",
    description:
      "A program for practitioners done with generic advice. Install the ecological dynamics operating system and rebuild your practice from it.",
    url: "https://attunemastery.com",
    siteName: "Attune",
    images: [
      {
        url: "https://attunemastery.com/og.png",
        width: 1200,
        height: 630,
        alt: "Attune — Skill is forged, not taught.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Attune — Skill is forged, not taught.",
    description:
      "A program for practitioners done with generic advice. Install the ecological dynamics operating system and rebuild your practice from it.",
    images: ["https://attunemastery.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider><html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html></ClerkProvider>
  );
}
