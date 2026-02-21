import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = "https://matrimoniolowcost.it";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Matrimonio da €30K con €8K — Guida Tattica Italia",
  description:
    "Strategie concrete per ridurre i costi del matrimonio del 70% senza compromettere la qualità. Template email vendor, checklist costi nascosti, calcolatore budget.",
  keywords: [
    "matrimonio low cost",
    "matrimonio economico",
    "budget matrimonio",
    "risparmiare matrimonio",
    "guida matrimonio",
    "matrimonio 10000 euro",
    "matrimonio economico Italia",
    "sposarsi risparmiando",
    "organizzare matrimonio low cost",
  ],
  alternates: {
    canonical: BASE_URL,
    languages: {
      "it-IT": BASE_URL,
    },
  },
  openGraph: {
    title: "Matrimonio da €30K con €8K — Guida Tattica Italia",
    description:
      "182 coppie hanno già risparmiato €376.000. Scarica la guida tattica per il tuo matrimonio.",
    type: "website",
    locale: "it_IT",
    url: BASE_URL,
    siteName: "Matrimonio Low Cost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrimonio da €30K con €8K — Guida Tattica",
    description:
      "Strategie concrete per risparmiare il 70% sul matrimonio senza compromessi.",
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "IT-MI",
    "geo.placename": "Milano",
    "geo.position": "45.4642;9.1900",
    ICBM: "45.4642, 9.1900",
    "content-language": "it",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" dir="ltr">
      <head>
        <link rel="alternate" hrefLang="it-IT" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <StructuredData />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
