import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { BrandDefs } from "@/components/logos";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiadengine.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Ad Engine — Facebook, Instagram, Google & TikTok ads, powered by AI",
    template: "%s — AI Ad Engine",
  },
  description:
    "Launch and manage advertising across Facebook, Instagram, Google and TikTok from one AI-powered platform. Built for South African businesses. From R599/month, month-to-month.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "AI Ad Engine",
    title: "Stop boosting posts. Start running ads that grow your business.",
    description:
      "Smarter ads. Bigger results. One platform, four major advertising channels, built for South African businesses. From R599/month.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "AI Ad Engine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Ad Engine — smarter ads, bigger results",
    description:
      "Facebook, Instagram, Google and TikTok ads from one AI-powered platform. From R599/month.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZA"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <BrandDefs />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
