"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shared/ProductCard";
import { Search, X, ChevronDown, ListFilter, AlertCircle } from "lucide-react";
import { ProductCardSkeleton } from "@/components/shared/Skeleton";

const CATEGORIES = [
  { id: 1, name: "Kitchen", slug: "kitchen" },
  { id: 2, name: "Bathroom", slug: "bathroom" },
  { id: 3, name: "Smart Gadgets", slug: "gadgets" },
  { id: 4, name: "Storage", slug: "storage" },
  { id: 5, name: "Daily Use", slug: "daily-use" },
];

export const dynamic = "force-dynamic";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "all";
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch based on params and avoid cache
        const url = category !== "all" ? `/api/products?category=${category}` : '/api/products';
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        // Ensure filtering works even if API returns all
        let filtered = data;
        if (category !== "all") {
          filtered = data.filter((p: any) => {
            const catSlug = p.category.toLowerCase().replace(/\s+/g, '-');
            return catSlug === category || p.category.toLowerCase() === category;
          });
        }
        setProducts(filtered);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-run whenever the category param changes

  const currentCategoryName = useMemo(() => {
    if (category === "all") return "All Products";
    return CATEGORIES.find(c => c.slug === category)?.name || "Products";
  }, [category]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [products, searchQuery, sortBy]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-6">We couldn't load the products. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all"
          >
            Retry
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-20">
        {/* Simple Centered Header */}
        <div className="text-center py-10 border-b border-gray-100 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentCategoryName}
          </h1>
          <p className="text-gray-500 text-sm">
            Browse useful gadgets for everyday life
          </p>
        </div>

        {/* Minimal Search + Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-500 uppercase">Sort:</span>
            <div className="relative w-full md:w-44">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer appearance-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Simple Vertical Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4 px-1">
                <ListFilter size={16} className="text-gray-400" />
                <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Categories</h2>
              </div>
              
              <div className="flex flex-col">
                <button 
                  onClick={() => router.push("/products")}
                  className={`text-left px-3 py-2.5 text-sm font-medium transition-colors rounded-md ${
                    category === "all" 
                    ? "text-orange-600 bg-orange-50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => router.push(`/products?category=${cat.slug}`)}
                    className={`text-left px-3 py-2.5 text-sm font-medium transition-colors rounded-md ${
                      category === cat.slug 
                      ? "text-orange-600 bg-orange-50" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Clean Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Simple Empty State */
              <div className="text-center py-20 bg-gray-50/50 rounded-xl border border-gray-100">
                <p className="text-gray-500 font-medium mb-4">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    router.push("/products");
                    setSearchQuery("");
                  }}
                  className="text-orange-600 font-bold hover:underline"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}
