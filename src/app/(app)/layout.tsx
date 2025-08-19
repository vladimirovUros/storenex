import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Toaster } from "@/components/ui/sonner";

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
      <body className={`${DM_SANS.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster position="bottom-right" expand={true} richColors={true} />
        </NuqsAdapter>
        <SpeedInsights />
      </body>
    </html>
  );
}
