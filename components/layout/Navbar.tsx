"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Truck, User, ShoppingCart, Menu, Phone } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? getItemCount() : 0;

  useEffect(() => {
    if (cartCount === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">

      {/* Top Navbar */}
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between md:gap-12 overflow-visible">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center py-1 relative z-[60]">
            <Image
              src="/logo.png"
              alt="Gadgetion Logo"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for gadgets, kitchen, bathroom & more..."
                className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-500 transition-all focus:bg-white focus:ring-4 focus:ring-orange-50 text-gray-900 placeholder-gray-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-orange-500 text-white px-4 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5 lg:gap-8 shrink-0">
            <Link href="/track" className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              <Truck size={20} />
              <span>Track Order</span>
            </Link>

            <Link href="/account" className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              <User size={20} />
              <span>Account</span>
            </Link>

            <Link href="/cart" className={`flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-all font-medium ${isBumping ? 'scale-110' : 'scale-100'}`}>
              <div className="relative">
                <ShoppingCart size={24} className={`${isBumping ? 'text-orange-500' : 'text-gray-700'}`} />
                {cartCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm transition-transform ${isBumping ? 'scale-125' : 'scale-100'}`}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-sm">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sub Navbar */}
      <div className="border-t border-gray-100 hidden md:block bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2.5">

            {/* Categories */}
            <div className="w-[180px] relative group">
              <button className="flex items-center gap-2 font-bold text-gray-900 hover:text-orange-500 transition-colors text-sm py-2">
                <Menu size={18} />
                Categories
              </button>

              <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 translate-y-2 group-hover:translate-y-0 flex flex-col py-2">
                <Link href="/products?category=kitchen" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-500 hover:bg-orange-50">Kitchen</Link>
                <Link href="/products?category=bathroom" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-500 hover:bg-orange-50">Bathroom</Link>
                <Link href="/products?category=gadgets" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-500 hover:bg-orange-50">Smart Gadgets</Link>
                <Link href="/products?category=storage" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-500 hover:bg-orange-50">Storage</Link>
                <Link href="/products?category=daily-use" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-500 hover:bg-orange-50">Daily Use</Link>
              </div>
            </div>

            {/* Center Nav */}
            <nav className="flex items-center gap-8 font-semibold text-gray-700 text-sm">
              <Link href="/products" className="hover:text-orange-500 transition-colors">
                All Products
              </Link>
              <Link href="/#new-arrivals" className="hover:text-orange-500 transition-colors">
                New Arrivals
              </Link>
              <Link href="/#trending" className="hover:text-orange-500 transition-colors">
                Trending
              </Link>
              <Link href="/contact" className="hover:text-orange-500 transition-colors">
                Contact Us
              </Link>
              <Link href="/track" className="hover:text-orange-500 transition-colors">
                Track Order
              </Link>
            </nav>

            {/* WhatsApp */}
            <div className="w-[180px] flex justify-end">
              <Link href="https://wa.me/923362092937" className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors text-sm">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Phone size={14} className="fill-green-600" />
                </div>
                WhatsApp Us
              </Link>
            </div>

          </div>
        </div>
      </div>

    </header>
  );
}
