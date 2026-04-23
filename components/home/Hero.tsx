"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToCategories = () => {
    const element = document.getElementById("categories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="bg-gradient-to-r from-orange-50 to-white pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 flex justify-center">

        {/* Centered Content */}
        <div className="max-w-6xl w-full text-center mx-auto flex flex-col items-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-orange-600 font-bold text-sm tracking-widest uppercase mb-4 justify-center">
            <span>NEW STOCK DROP</span>
            <span>🔥</span>
            <span>🌀</span>
          </div>

          {/* Heading (FORCED SINGLE LINE) */}
          <h1 className="text-4xl md:text-6xl lg:text-[64px] font-black text-gray-900 leading-[1.05] mb-4 tracking-tight whitespace-normal lg:whitespace-nowrap">
            Smart Gadgets for <span className="text-orange-500">Everyday Life</span>
          </h1>

          {/* Description (centered + controlled width) */}
          <p className="text-gray-600 text-lg md:text-xl mb-6 max-w-xl mx-auto leading-relaxed text-center">
            Useful, affordable & imported directly for you. Limited stock - grab before it&apos;s gone!
          </p>

          {/* Buttons (tight + centered) */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 text-base shadow-lg shadow-orange-200">
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>

          {/* Scroll Down Indicator */}
          <button 
            onClick={scrollToCategories}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors animate-bounce mt-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll Down</span>
            <ChevronDown size={20} />
          </button>

        </div>
      </div>
    </section >
  );
}