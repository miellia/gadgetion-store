"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ShoppingBag, Truck } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Order ID is missing.");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError("Could not load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 font-bold text-gray-500 tracking-wide animate-pulse">Loading order details...</p>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{error || "We couldn't find the order you are looking for. It may have been removed or the link is invalid."}</p>
        <Link href="/" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
          Return to Store
        </Link>
      </main>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="flex-1 container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
            <CheckCircle2 className="text-green-500" size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Thank you for shopping with Gadgetion. We will contact you shortly to confirm your order.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-8">
          
          {/* Order Meta Info */}
          <div className="bg-gray-50/50 p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
              <p className="font-bold text-gray-900 font-mono">#{order.id.slice(-8).toUpperCase()}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
              <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="font-black text-gray-900 uppercase tracking-wider text-sm mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Name</p>
                <p className="font-bold text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                <p className="font-bold text-gray-900">{order.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Shipping Address</p>
                <p className="font-bold text-gray-900">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="font-black text-gray-900 uppercase tracking-wider text-sm mb-6">Order Items</h3>
            <div className="space-y-4">
              {items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm font-medium text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50/50 p-6 md:p-8 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-sm font-bold text-gray-500">Including shipping</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-orange-500 tracking-tighter">Rs. {order.total?.toLocaleString()}</p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-900 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
          <Link
            href="/track"
            className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
          >
            <Truck size={18} /> Track Order
          </Link>
        </div>

      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Suspense fallback={
        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </main>
      }>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
