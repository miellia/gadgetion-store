"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function ScrollManager() {
  const pathname = usePathname();
  const [showButton, setShowButton] = useState(false);

  // 1. Force scroll to top on every route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // 2. Handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-orange-500 text-white shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 ${
          showButton 
            ? "translate-y-0 opacity-100 visible" 
            : "translate-y-10 opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </>
  );
}
