"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ProductTabsProps {
  product: {
    id: string;
    title: string;
    description?: string | null;
    images: string[];
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("Description");

  const tabs = [
    { id: "Description", label: "Description" },
    { id: "Shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="mt-16 border-t border-gray-100">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
        <div className="flex items-center gap-8 px-4 md:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab.id 
                  ? "border-orange-500 text-orange-500" 
                  : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "Description" && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
              About this product
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description || "No description available."}
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                  Imported Premium Quality
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                  Durable & Long-lasting
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                  Satisfaction Guaranteed
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "Shipping" && (
          <div className="text-gray-600 max-w-2xl">
            <h3 className="font-bold text-gray-900 mb-4">Shipping Information</h3>
            <p className="mb-4 text-sm leading-relaxed">
              We offer nationwide delivery across Pakistan. Delivery typically takes 3-5 business days.
            </p>
            <h3 className="font-bold text-gray-900 mb-2 mt-6">Return Policy</h3>
            <p className="text-sm leading-relaxed">
              We have a 7-day return policy. If you are not satisfied with your purchase, you can return it within 7 days for a full refund or exchange.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
