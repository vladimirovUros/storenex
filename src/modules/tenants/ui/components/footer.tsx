import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const logoFont = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 py-6 lg:px-12">
        <p>Powered by</p>
        <Link href={process.env.NEXT_PUBLIC_API_URL!}>
          <span className={cn("text-xl font-semibold", logoFont.className)}>
            storenex
          </span>
        </Link>
      </div>
    </footer>
  );
};
