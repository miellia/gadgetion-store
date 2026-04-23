"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number | null;
    images: string[];
    isNew?: boolean;
    isTrending?: boolean;
    stock: number;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const displayImage = product.images?.[0] || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=500&auto=format&fit=crop";

  return (
    <div className="group bg-white rounded-lg border border-gray-100 p-3 hover:border-orange-200 transition-all duration-300 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative aspect-square rounded-md bg-gray-50 mb-3 overflow-hidden flex items-center justify-center p-2">
        <Link href={`/product/${product.id}`} className="w-full h-full relative">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Hot
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-[13px] leading-tight mb-2 line-clamp-2 hover:text-orange-500 transition-colors h-[2rem]">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-base text-gray-900">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <span className="text-[10px] text-gray-400 font-medium">
            {product.stock > 0 ? `${product.stock} items left` : "Out of stock"}
          </span>

          <button 
            onClick={() => addItem(product)}
            className="text-gray-400 hover:text-orange-500 transition-all active:scale-90"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
