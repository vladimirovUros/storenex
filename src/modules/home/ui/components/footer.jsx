import Link from "next/link";
import {
  Heart,
  Mail,
  Github,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-white border-t-4 border-black overflow-hidden">
      <div className="absolute top-0 left-[15%] w-16 h-8 bg-yellow-300 border-2 border-black rotate-12 -translate-y-1/2 rounded-[10px]"></div>
      <div className="absolute top-0 right-[20%] w-12 h-12 bg-orange-500 border-2 border-black -rotate-45 -translate-y-1/2 rounded-full"></div>
      <div className="absolute bottom-0 left-[30%] w-12 h-12 bg-green-400 border-2 border-black rotate-[30deg] translate-y-1/2"></div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute top-2 left-2 w-full h-full bg-black rounded-[15px]"></div>
                <div className="relative bg-yellow-300 border-4 border-black p-4 rounded-[15px] -rotate-1">
                  <h3 className="text-2xl font-black">STORENEX</h3>
                </div>
              </div>
              <p className="text-lg font-bold leading-relaxed">
                The most{" "}
                <span className="bg-orange-500 px-2 py-1 border-2 border-black rotate-1 inline-block rounded-md font-black">
                  SIMPLE
                </span>{" "}
                way to sell digital products!
              </p>
              <div className="flex gap-4">
                <Link href="mailto:contact@storenex.shop" className="group">
                  <div className="relative">
                    <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="relative bg-green-400 border-3 border-black p-3 rounded-lg group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                      <Mail className="h-5 w-5 stroke-black stroke-2" />
                    </div>
                  </div>
                </Link>
                <Link href="https://github.com" className="group">
                  <div className="relative">
                    <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="relative bg-purple-400 border-3 border-black p-3 rounded-lg group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                      <Github className="h-5 w-5 stroke-black stroke-2" />
                    </div>
                  </div>
                </Link>
                <Link href="https://twitter.com" className="group">
                  <div className="relative">
                    <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="relative bg-blue-400 border-3 border-black p-3 rounded-lg group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                      <Twitter className="h-5 w-5 stroke-black stroke-2" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute top-2 left-2 w-full h-full bg-black rounded-[15px]"></div>
                <div className="relative bg-orange-500 border-4 border-black p-4 rounded-[15px] rotate-1">
                  <h3 className="text-xl font-black text-white">QUICK LINKS</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { href: "/", label: "HOME" },
                  { href: "/about", label: "ABOUT" },
                  { href: "/features", label: "FEATURES" },
                  { href: "/pricing", label: "PRICING" },
                ].map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block"
                  >
                    <div className="relative">
                      <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                      <div
                        className={`relative bg-white border-3 border-black px-4 py-2 rounded-lg group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all font-bold ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                      >
                        {link.label}
                        <ExternalLink className="inline h-4 w-4 ml-2 stroke-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute top-2 left-2 w-full h-full bg-black rounded-[15px]"></div>
                <div className="relative bg-green-400 border-4 border-black p-3 rounded-[15px] -rotate-1">
                  <h3 className="text-lg font-black">SUPPORT & LEGAL</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/contact", label: "CONTACT" },
                  { href: "/privacy", label: "PRIVACY" },
                  { href: "/help", label: "HELP" },
                  { href: "/terms", label: "TERMS" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/careers", label: "CAREERS" },
                ].map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block"
                  >
                    <div className="relative">
                      <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                      <div
                        className={`relative bg-white border-2 border-black px-3 py-1 rounded-lg group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all font-bold text-sm ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
                      >
                        {link.label}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="relative bg-yellow-300 border-2 border-black p-1 rounded-lg">
                      <MapPin className="h-3 w-3 stroke-black stroke-2" />
                    </div>
                  </div>
                  <span className="font-bold text-xs">Belgrade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute top-1 left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="relative bg-orange-500 border-2 border-black p-1 rounded-lg">
                      <Phone className="h-3 w-3 stroke-white stroke-2" />
                    </div>
                  </div>
                  <span className="font-bold text-xs">+381 60 123 45 67</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative my-6">
            <div className="h-1 bg-black"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-300 border-3 border-black rotate-45 rounded-lg"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-black rounded-[15px]"></div>
              <div className="relative bg-white border-3 border-black px-4 py-2 rounded-[15px] rotate-1">
                <p className="font-bold text-sm">© 2025 STORENEX Inc.</p>
              </div>
            </div>
            <Link
              href="https://github.com/vladimirovUros"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative">
                <div className="absolute top-2 left-2 w-full h-full bg-black rounded-[20px]"></div>
                <div className="relative bg-orange-500 border-4 border-black px-6 py-3 rounded-[20px] -rotate-1 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                  <p className="text-lg font-black text-white flex items-center gap-2">
                    Made by{" "}
                    <span className="bg-white text-black px-2 py-1 border-2 border-black rotate-1 rounded-lg text-sm group-hover:bg-yellow-300 transition-colors">
                      vladimirovUros
                    </span>
                  </p>
                </div>
              </div>
            </Link>
            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-black rounded-[15px]"></div>
              <div className="relative bg-green-400 border-3 border-black px-4 py-2 rounded-[15px] -rotate-1">
                <p className="font-black text-sm">
                  BRUTALLY{" "}
                  <span className="bg-white px-2 py-1 border-2 border-black rotate-2 inline-block rounded-md text-xs">
                    SIMPLE
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
