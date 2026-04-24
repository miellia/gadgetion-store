"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Check, Heart, Star, Minus, Plus } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const { addItem, updateQuantity, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const displayImage = product.images?.[0] || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=500&auto=format&fit=crop";
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdded(true);
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      addItem(product);
      if (quantity > 1) {
        updateQuantity(product.id, quantity);
      }
    }
    
    toast.success(`${product.title} added to cart!`);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="group bg-white rounded-[2rem] border border-orange-100 p-4 shadow-[0_0_40px_rgba(249,115,22,0.12)] hover:border-orange-200 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(249,115,22,0.25)] transition-all duration-500 flex flex-col h-full relative overflow-hidden">
      
      {/* 1. IMAGE SECTION */}
      <div className="relative aspect-square rounded-[1.5rem] bg-gray-50 mb-5 overflow-hidden flex items-center justify-center p-4 shadow-inner">
        <Link href={`/product/${product.id}`} className="w-full h-full relative block">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        
        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-green-500/20 scale-90 origin-left">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-orange-500/20 scale-90 origin-left">
              Hot
            </span>
          )}
        </div>

        {/* Wishlist Icon (Top Right) */}
        <button 
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 scale-90 group-hover:scale-100 ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "white" : "none"} />
        </button>

        {/* Stock Indicator (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1.5 rounded-full z-10 flex items-center gap-1 border border-white/10 uppercase tracking-tighter shadow-xl">
          <span className="animate-pulse">🔥</span> {product.stock} items left
        </div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="flex flex-col flex-1 px-1">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex text-orange-400">
            {[...Array(4)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
            <Star size={10} className="text-gray-200" fill="currentColor" />
          </div>
          <span className="text-[10px] font-black text-gray-400 tracking-tighter uppercase">(128 reviews)</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-black text-gray-900 text-sm leading-tight mb-2 line-clamp-2 hover:text-orange-500 transition-colors h-[2.5rem] flex items-center">
            {product.title}
          </h3>
        </Link>

        {/* Subtext (Benefits) */}
        <p className="text-[10px] font-bold text-gray-400 mb-4 truncate uppercase tracking-tight">
          Premium Quality • Durable • Easy to Use
        </p>
        
        {/* Price Block */}
        <div className="flex items-center flex-wrap gap-2 mb-6">
          <span className="font-black text-lg text-orange-500 tracking-tight">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 line-through font-bold">Rs. {product.originalPrice.toLocaleString()}</span>
              <span className="bg-orange-50 text-orange-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase border border-orange-100">
                {discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* 3. ACTION SECTION */}
        <div className="flex flex-col gap-2.5 mt-auto">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-gray-50/50 rounded-xl p-1 border border-gray-100/50">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors hover:bg-white rounded-lg shadow-sm"
            >
              <Minus size={12} />
            </button>
            <span className="text-[11px] font-black text-gray-900 w-6 text-center">{quantity}</span>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity(quantity + 1); }}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors hover:bg-white rounded-lg shadow-sm"
            >
              <Plus size={12} />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 text-[11px] uppercase tracking-widest ${
              isAdded 
                ? 'bg-green-500 text-white shadow-green-500/20 cursor-default' 
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} strokeWidth={3} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} strokeWidth={2.5} /> Add to Cart
              </>
            )}
          </button>
        </div>

        {/* 4. TRUST STRIP */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-50/50">
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">🚚 COD</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">🔁 7 DAYS</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">⚡ FAST</span>
          </div>
        </div>
      </div>
    </div>
  );
}
