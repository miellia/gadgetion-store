import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Kitchen", icon: "/products/1.jpg", slug: "kitchen" }, 
  { name: "Bathroom", icon: "/products/2.jpg", slug: "bathroom" },
  { name: "Smart Gadgets", icon: "/products/3.jpg", slug: "gadgets" },
  { name: "Storage", icon: "/products/4.jpg", slug: "storage" },
  { name: "Daily Use", icon: "/products/5.jpg", slug: "daily-use" },
];

export default function CategoryBar() {
  return (
    <section id="categories" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Categories
          </h2>
          <p className="text-gray-500 font-medium">
            Browse products by category
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/products?category=${category.slug}`}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:shadow-xl group-hover:shadow-orange-100 group-hover:border-orange-200 transition-all group-hover:-translate-y-2 relative overflow-hidden">
                {category.isDeals ? (
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-red-500 font-black text-2xl">%</span>
                  </div>
                ) : (
                  <div className="relative w-12 h-12">
                    <Image
                      src={category.icon!}
                      alt={category.name}
                      fill
                      className="object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-500"
                    />
                  </div>
                )}
              </div>
              <span className={`font-bold text-sm tracking-tight ${category.isDeals ? 'text-red-500' : 'text-gray-800'} group-hover:text-orange-500 transition-colors`}>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
