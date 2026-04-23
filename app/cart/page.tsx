"use client";

import { useCart } from "@/store/useCart";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 md:p-20 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-orange-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any gadgets yet. Explore our latest collection and find something you love!</p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items List */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 md:gap-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0 relative border border-gray-50">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-contain mix-blend-multiply p-2"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <Link href={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-orange-500 transition-colors md:text-lg line-clamp-1">
                        {item.title}
                      </Link>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="text-lg font-black text-gray-900 mb-4">
                      Rs. {item.price.toLocaleString()}
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="w-10 h-8 md:w-12 md:h-10 flex items-center justify-center font-bold text-gray-900 border-x border-gray-200 text-sm">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-gray-900 font-bold">
                        Subtotal: Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 shrink-0">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping Fee</span>
                    <span>Rs. {shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between text-gray-900">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-100 mb-6 active:scale-95 text-lg flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <ShieldCheck size={18} className="text-green-500 shrink-0" />
                    Secure Payment & Data Protection
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <div className="w-[18px] h-[18px] bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-blue-600 font-black text-[8px]">PK</span>
                    </div>
                    Cash on Delivery Available Nationwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
