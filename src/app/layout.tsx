import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: "Matrimonio da €30K con €8K — Guida Tattica Italia",
    description:
      "182 coppie hanno già risparmiato €376.000. Scarica la guida tattica per il tuo matrimonio.",
    type: "website",
    locale: "it_IT",
    url: "https://matrimoniolowcost.it",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrimonio da €30K con €8K — Guida Tattica",
    description:
      "Strategie concrete per risparmiare il 70% sul matrimonio senza compromessi.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
