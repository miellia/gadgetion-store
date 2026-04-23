import { ProductCardSkeleton } from "@/components/shared/Skeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="text-center py-10 border-b border-gray-100 mb-10">
          <div className="h-8 bg-gray-100 rounded-md w-48 mx-auto mb-2" />
          <div className="h-4 bg-gray-100 rounded-md w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
