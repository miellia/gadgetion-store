import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductSection from "@/components/home/ProductSection";
import { ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getProduct(id: string) {
  if (!id || id.length !== 24) return null;
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
}

async function getRelatedProducts(category: string, excludeId: string) {
  try {
    return await prisma.product.findMany({
      where: {
        category,
        id: { not: excludeId }
      },
      take: 4
    });
  } catch (error) {
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href={`/products?category=${product.category}`} className="hover:text-orange-500 transition-colors capitalize">{product.category}</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.title}</span>
          </div>

          {/* Main Product Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
            <div className="w-full">
              <ProductGallery images={product.images} />
            </div>
            <div className="w-full">
              <ProductInfo product={product as any} />
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-16">
              <ProductSection 
                title="You May Also Like" 
                subtitle="" 
                products={relatedProducts} 
              />
            </div>
          )}

          {/* WhatsApp Support Section */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-green-100">
                <Phone size={28} className="fill-green-500 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1">
                  Have Questions? Chat with us on WhatsApp
                </h3>
                <p className="text-gray-600 text-sm">
                  Available for support and quick ordering.
                </p>
              </div>
            </div>
            
            <Link 
              href="https://wa.me/923362092937" 
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <Phone size={20} className="fill-white" /> Chat Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
