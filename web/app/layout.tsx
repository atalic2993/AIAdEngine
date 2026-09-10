import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { BrandDefs } from "@/components/logos";
import { JsonLd } from "@/components/json-ld";
import { graph, organisationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Kept under about sixty characters so Google shows the whole line instead of
  // cutting it off, and led by what people actually search for rather than by
  // the brand name.
  title: {
    default: "AI Ad Software for South African Businesses | AI Ad Engine",
    template: "%s | AI Ad Engine",
  },
  description:
    "Plan and manage ads across Facebook, Instagram, Google and TikTok, then track every enquiry in one CRM and sales pipeline. Built for South African businesses.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: "AI Ad Engine",
    title: "AI Ad Software for South African Businesses | AI Ad Engine",
    description:
      "Plan and manage ads across Facebook, Instagram, Google and TikTok, then track every enquiry in one CRM and sales pipeline. Built for South African businesses.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "AI Ad Engine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Ad Software for South African Businesses | AI Ad Engine",
    description:
      "Plan and manage ads across Facebook, Instagram, Google and TikTok, then track every enquiry in one CRM and sales pipeline. Built for South African businesses.",
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
        {/* Who this company is and which site this is. Every page inherits it. */}
        <JsonLd data={graph(organisationSchema(), websiteSchema())} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
