import type { Metadata } from "next";
import { Inter, Bebas_Neue, DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth Khatke — Full Stack Developer",
  description:
    "Full Stack Developer. Driven by curiosity, built for scale. Engineering scalable backends and crafting award-winning UIs.",
  openGraph: {
    title: "Parth Khatke — Full Stack Developer",
    description:
      "Full Stack Developer. Driven by curiosity, built for scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${dmSans.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A0A] text-white/90 overflow-x-hidden">{children}</body>
    </html>
  );
}
