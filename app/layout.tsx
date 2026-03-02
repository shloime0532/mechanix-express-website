import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mechanix-express-website.vercel.app"),
  title: "Mechanix Express | Expert Auto Repair in Lakewood, NJ",
  description:
    "Lakewood's trusted auto repair shop. Engine diagnostics, brake service, transmission repair, oil changes & more. 5-star rated with 12+ verified reviews. Same-day service available. Call (732) 730-7712.",
  openGraph: {
    title: "Mechanix Express | Expert Auto Repair in Lakewood, NJ",
    description:
      "Lakewood's trusted auto repair shop. 5-star rated. Expert mechanics specializing in Honda, Hyundai, Kia, Nissan & Toyota.",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
