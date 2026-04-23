"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images = [] }: ProductGalleryProps) {
  const fallbackImage = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=1000&auto=format&fit=crop";
  const displayImages = images.length > 0 ? images : [fallbackImage];
  const [activeImage, setActiveImage] = useState(displayImages[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 relative md:w-20 lg:w-24 shrink-0">
        <div className="flex md:flex-col gap-3 overflow-auto hide-scrollbar snap-x snap-mandatory pb-2 md:pb-0 md:pr-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-16 h-16 md:w-full md:h-20 lg:h-24 rounded-xl border-2 overflow-hidden shrink-0 snap-start transition-colors bg-gray-50
                ${activeImage === img ? "border-orange-500" : "border-gray-200 hover:border-orange-300"}`}
            >
              <Image src={img} alt="Thumbnail" fill className="object-contain p-2 mix-blend-multiply" />
            </button>
          ))}
        </div>
        
        {/* Scroll button (desktop only) */}
        <button className="hidden md:flex absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 shadow-sm hover:text-orange-500 z-10">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-square md:aspect-auto md:h-[500px] lg:h-[600px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
        <Image src={activeImage} alt="Product" fill className="object-contain p-8 mix-blend-multiply transition-opacity duration-300" />
      </div>
    </div>
  );
}
