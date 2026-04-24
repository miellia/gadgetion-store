"use client";

import { useState } from "react";
import { CheckCircle2, ShoppingCart, Flame, Check } from "lucide-react";
import { useCart } from "@/store/useCart";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    description?: string | null;
    price: number;
    originalPrice?: number | null;
    images: string[];
    isNew?: boolean;
    isTrending?: boolean;
    stock: number;
    category: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, updateQuantity, items } = useCart();

  const existingItem = items.find(item => item.id === product.id);

  const handleAddToCart = () => {
    setIsAdded(true);
    
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

  return (
    <div className="flex flex-col h-full">
      {product.isNew && (
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-3 uppercase">
          NEW
        </span>
      )}
      
      <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2 leading-tight">
        {product.title}
      </h1>
      
      {product.description && (
        <p className="text-gray-500 text-lg mb-6 line-clamp-3">{product.description}</p>
      )}

      {/* Price */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl font-black text-gray-900">Rs. {product.price.toLocaleString()}</span>
        {product.originalPrice && (
          <span className="text-xl text-gray-400 line-through ml-2">Rs. {product.originalPrice.toLocaleString()}</span>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm">
          <CheckCircle2 size={16} /> In Stock
        </div>
        <span className="text-orange-500 font-bold text-sm">
          {product.stock > 0 ? `Only ${product.stock} left!` : "Out of stock"}
        </span>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-bold text-gray-900">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button 
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <div className="w-12 h-10 flex items-center justify-center font-bold text-gray-900 border-x border-gray-200">
            {quantity}
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full sm:flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-lg ${
            isAdded 
              ? 'bg-green-500 text-white cursor-default scale-95' 
              : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={20} /> Added ✓
            </>
          ) : (
            <>
              <ShoppingCart size={20} /> Add to Cart
            </>
          )}
        </button>
        <button className="w-full sm:flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-lg">
          Buy on WhatsApp
        </button>
      </div>

      {/* Trust small strip */}
      <div className="flex flex-wrap items-center gap-6 mb-8 py-4 border-y border-gray-100 text-sm text-gray-700 font-medium">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          <div>
            <span className="block font-bold text-gray-900 text-xs">Cash on Delivery</span>
            <span className="text-[10px] text-gray-500">Pay when you receive</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          <div>
            <span className="block font-bold text-gray-900 text-xs">Easy Returns</span>
            <span className="text-[10px] text-gray-500">7 days return policy</span>
          </div>
        </div>
      </div>

      {/* Urgency */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
        <Flame className="text-orange-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-900 mb-1">Hurry up! This product is selling fast.</p>
          <p className="text-sm text-gray-700">Order soon to get it by tomorrow.</p>
        </div>
      </div>
    </div>
  );
}
