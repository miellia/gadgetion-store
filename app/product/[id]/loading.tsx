import { ProductPageSkeleton } from "@/components/shared/Skeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Loading() {
  return (
    <>
      <Navbar />
      <ProductPageSkeleton />
      <Footer />
    </>
  );
}
