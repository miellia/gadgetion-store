"use client";

import { useCart } from "@/store/useCart";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  CheckCircle2,
  Package,
  Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

  const STORE_WHATSAPP_NUMBER = "923362092937";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = "Enter a valid phone number";
    if (!formData.address.trim()) newErrors.address = "Complete address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    let message = `Hi Gadgetion, I want to place an order:\n\n`;
    message += `🛒 *Products:*\n\n`;

    items.forEach((item) => {
      message += `* ${item.title} (x${item.quantity}) — Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Total:* Rs. ${total.toLocaleString()}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n`;
    if (formData.notes) message += `Notes: ${formData.notes}\n`;

    return encodeURIComponent(message);
  };

  const saveOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
          items: items.map(item => ({
            productId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          total: total,
        }),
      });

      if (!response.ok) throw new Error("Failed to save order");
      return await response.json();
    } catch (error) {
      console.error("Order error:", error);
      return null;
    }
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const order = await saveOrder();
      setIsSubmitting(false);

      if (order) {
        const encodedMessage = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
        clearCart();
        setIsSuccess(true);
      } else {
        alert("Something went wrong while saving your order. Please try again.");
      }
    }
  };

  const handleCODOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const order = await saveOrder();

      if (order) {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      } else {
        setIsSubmitting(false);
        alert("Something went wrong while saving your order. Please try again.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl text-center max-w-lg w-full">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Order Placed!</h1>
            <p className="text-gray-500 mb-8 text-lg">
              Your order has been received successfully. We will contact you shortly to confirm your booking.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 text-lg"
            >
              Back to Store
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="text-orange-500" size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Your cart is empty</h1>
          <p className="text-gray-500 mb-10 text-center max-w-md text-lg">Add some gadgets to your cart to proceed with checkout. Your next favorite device is just a click away!</p>
          <Link href="/products" className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 active:scale-95">
            Browse Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 font-bold transition-colors group">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Cart
          </Link>

          <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Checkout Form */}
            <div className="flex-1">
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Truck size={20} className="text-orange-500" />
                  </div>
                  Shipping Information
                </h2>

                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-wider">Full Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full px-6 py-4 rounded-2xl border ${errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'} focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-900`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-500 font-black ml-2 uppercase tracking-widest">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-wider">Phone Number</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03XXXXXXXXX"
                        className={`w-full px-6 py-4 rounded-2xl border ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'} focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-900`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-black ml-2 uppercase tracking-widest">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-wider">Complete Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Your complete address (House #, Street, City)"
                      className={`w-full px-6 py-4 rounded-2xl border ${errors.address ? 'border-red-500 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'} focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all resize-none placeholder:text-gray-300 font-bold text-gray-900`}
                    />
                    {errors.address && <p className="text-[10px] text-red-500 font-black ml-2 uppercase tracking-widest">{errors.address}</p>}
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-wider">Order Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Anything else we should know?"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50/30 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all resize-none placeholder:text-gray-300 font-bold text-gray-900"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-[420px] shrink-0">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-28">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                    <Package size={20} className="text-gray-500" />
                  </div>
                  Order Summary
                </h2>

                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-3 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center group">
                      <div className="w-20 h-20 bg-gray-50 rounded-[1.25rem] overflow-hidden shrink-0 relative border border-gray-100 group-hover:border-orange-100 transition-colors">
                        <Image src={item.image} alt={item.title} fill className="object-contain p-2 mix-blend-multiply" />
                        <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate mb-1">{item.title}</h3>
                        <p className="text-base font-black text-orange-500">Rs. {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-black text-xs uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-black text-xs uppercase tracking-widest">
                    <span>Shipping Fee</span>
                    <span className="text-gray-900">Rs. {shipping.toLocaleString()}</span>
                  </div>

                  {/* Separation Line */}
                  <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Total to Pay</p>
                      <span className="text-4xl font-black text-gray-900 tracking-tighter">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 active:scale-[0.98] text-lg relative overflow-hidden group disabled:opacity-50 disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <MessageCircle size={24} fill="white" /> Order via WhatsApp
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCODOrder}
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-900 text-gray-900 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-lg disabled:opacity-50 disabled:border-gray-200 disabled:text-gray-300"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard size={22} /> Place Order (COD)
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Section */}
                <div className="mt-10 space-y-3 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <ShieldCheck size={14} className="text-green-500" />
                    </div>
                    Cash on Delivery Available
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <Zap size={14} className="text-blue-500" />
                    </div>
                    Fast delivery across Pakistan
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <div className="w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle size={14} className="text-orange-500" />
                    </div>
                    Easy order confirmation via WhatsApp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
