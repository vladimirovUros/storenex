"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          <div className="absolute top-2 left-2 w-full h-full bg-black rounded-full"></div>
          <div className="relative bg-orange-500 border-4 border-black p-4 rounded-full group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200 group-hover:bg-yellow-300">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 border-2 border-black rotate-45 rounded-sm group-hover:bg-green-400 transition-colors"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 border-2 border-black rotate-45 group-hover:bg-orange-500 transition-colors"></div>
            <ArrowUp className="h-6 w-6 stroke-black stroke-3 group-hover:stroke-black transition-all" />
          </div>
        </button>
      )}
    </>
  );
};
