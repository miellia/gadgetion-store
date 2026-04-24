import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "../shared/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: any[];
}

export default function ProductSection({ 
  title, 
  subtitle, 
  badge,
  products 
}: ProductSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {badge && (
            <span className="inline-block bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group"
          >
            View More Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
