import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryBar from "@/components/home/CategoryBar";
import ProductSection from "@/components/home/ProductSection";
import TrustSection from "@/components/home/TrustSection";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  const newArrivals = products.filter(p => p.isNew);
  const trendingNow = products.filter(p => p.isTrending);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <Hero />
        <CategoryBar />
        
        {newArrivals.length > 0 && (
          <div id="new-arrivals" className="scroll-mt-32">
            <ProductSection 
              title="New Arrivals" 
              subtitle="Check out the latest gadgets just landed in our store." 
              badge="NEW"
              products={newArrivals} 
            />
          </div>
        )}
        
        {trendingNow.length > 0 && (
          <div id="trending" className="scroll-mt-32">
            <ProductSection 
              title="Trending Now" 
              subtitle="Most loved products by our customers this week." 
              badge="HOT"
              products={trendingNow} 
            />
          </div>
        )}
        
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
