"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Gadgetion!%0A%0AMy name is ${formData.name}.%0APhone: ${formData.phone}%0A%0AMessage:%0A${formData.message}`;
    window.open(`https://wa.me/923362092937?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500 font-medium">We're here to help you with your orders and questions.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Contact Info & CTA */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Get in Touch</h2>
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="text-orange-500" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:support@gadgetion.pk" className="text-xl font-black text-gray-900 hover:text-orange-500 transition-colors">support@gadgetion.pk</a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                  <a href="tel:+923362092937" className="text-xl font-black text-gray-900 hover:text-green-600 transition-colors">+92 336 2092937</a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-black text-gray-900">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-200">
              <h3 className="text-2xl font-black mb-2">Need immediate help?</h3>
              <p className="font-medium text-green-100 mb-8">Our support team is highly responsive on WhatsApp during business hours.</p>
              <a 
                href="https://wa.me/923362092937" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-green-600 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-green-50 transition-all active:scale-[0.98] shadow-lg"
              >
                <MessageCircle size={24} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Send us a message</h2>
            <p className="text-gray-500 font-medium mb-8">Fill out the form below and we'll reply directly to your WhatsApp.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone / WhatsApp</label>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                  placeholder="+92 336 2092937"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400 resize-none custom-scrollbar"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-gray-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                Send via WhatsApp <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
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
