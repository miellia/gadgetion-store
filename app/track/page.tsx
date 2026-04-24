"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageCircle, MapPin } from "lucide-react";

export default function TrackPage() {
  const STORE_WHATSAPP_NUMBER = "923362092937";
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hi%20Gadgetion,%20I%20would%20like%20to%20track%20my%20order.`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="text-orange-500" size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Track Your Order</h1>
          <p className="text-gray-500 mb-8 text-lg">
            Order tracking is coming soon. For now, you can track your order by contacting us directly on WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-green-100 active:scale-95 text-lg"
          >
            <MessageCircle size={24} /> Track via WhatsApp
          </a>
          <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            We are actively improving your experience.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
