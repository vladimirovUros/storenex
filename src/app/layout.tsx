import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const DM_SANS = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Stornex",
  description: "Multi vendor marketplace for digital goods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DM_SANS.className} antialiased`}>{children}</body>
    </html>
  );
}
