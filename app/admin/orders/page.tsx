"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Package, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ExternalLink,
  Search,
  Filter,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-600";
      case "confirmed": return "bg-blue-100 text-blue-600";
      case "delivered": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
            <div className="flex items-center gap-4 mt-2">
              <Link href="/admin" className="text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest pb-1 border-b-2 border-transparent">
                Products
              </Link>
              <Link href="/admin/orders" className="text-sm font-black text-orange-500 uppercase tracking-widest border-b-2 border-orange-500 pb-1">
                Orders
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-auto md:ml-2 pl-4 border-l border-gray-200">
              <LogoutButton />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Package size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Orders placed by customers will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white p-6 rounded-3xl border transition-all cursor-pointer group ${
                    selectedOrder?.id === order.id 
                    ? "border-orange-500 shadow-lg shadow-orange-50/50" 
                    : "border-gray-100 hover:border-orange-200 shadow-sm"
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getStatusColor(order.status)}`}>
                        <Package size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Order ID: {order.id.slice(-6).toUpperCase()}</div>
                        <h3 className="font-bold text-gray-900">{order.customerName}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-gray-900">Rs. {order.total.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Phone size={14} className="text-gray-300" />
                      {order.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 truncate max-w-[200px]">
                      <MapPin size={14} className="text-gray-300" />
                      {order.address}
                    </div>
                    <div className="ml-auto">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details Panel */}
            <div className="lg:col-span-1">
              {selectedOrder ? (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-28">
                  <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      Order Details
                    </h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">ID: {selectedOrder.id}</p>
                  </div>

                  <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {/* Status Update */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Status</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["pending", "confirmed", "delivered"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                            className={`py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border ${
                              selectedOrder.status === status 
                              ? getStatusColor(status) + " border-transparent shadow-sm" 
                              : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Customer</p>
                          <p className="text-sm font-bold text-gray-900">{selectedOrder.customerName}</p>
                          <p className="text-xs text-gray-500 font-medium">{selectedOrder.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Shipping Address</p>
                          <p className="text-sm font-bold text-gray-900 leading-relaxed">{selectedOrder.address}</p>
                        </div>
                      </div>
                      {selectedOrder.notes && (
                        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Order Notes</p>
                          <p className="text-xs text-orange-800 font-medium">{selectedOrder.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ordered Items ({selectedOrder.items.length})</p>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-contain p-1 mix-blend-multiply" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                              <p className="text-[10px] text-gray-500 font-bold">
                                Rs. {item.price.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                            <div className="text-xs font-black text-gray-900 shrink-0">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-500">Order Total</span>
                      <span className="text-2xl font-black text-gray-900">Rs. {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl h-[400px] flex flex-col items-center justify-center text-center p-8">
                  <Package size={32} className="text-gray-300 mb-4" />
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
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
