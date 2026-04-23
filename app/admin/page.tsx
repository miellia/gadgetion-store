"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, Save, Package, Tag, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { UploadDropzone } from "@/lib/uploadthing";
import LogoutButton from "@/components/admin/LogoutButton";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: string;
  stock: number;
  isNew: boolean;
  isTrending: boolean;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Smartphones",
    stock: "",
    images: [] as string[],
    isNew: false,
    isTrending: false,
    imageUrlInput: ""
  });

  const categories = ["Smartphones", "Laptops", "Accessories", "Audio", "Wearables"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description || "",
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        category: product.category,
        stock: product.stock.toString(),
        images: product.images,
        isNew: product.isNew,
        isTrending: product.isTrending,
        imageUrlInput: ""
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "Smartphones",
        stock: "",
        images: [],
        isNew: false,
        isTrending: false,
        imageUrlInput: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleAddImage = () => {
    if (formData.imageUrlInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, formData.imageUrlInput.trim()],
        imageUrlInput: ""
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.title.trim() || !formData.price || !formData.category || !formData.stock) {
      alert("Please fill in all required fields (Title, Price, Category, Stock)");
      return;
    }

    const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchProducts();
        handleCloseModal();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to save product"}`);
      }
    } catch (error) {
      console.error("Failed to save product");
      alert("Something went wrong while saving the product.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) fetchProducts();
      } catch (error) {
        console.error("Failed to delete product");
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case "smartphones": return "bg-gray-100 text-gray-700";
      case "laptops": return "bg-gray-100 text-gray-700";
      case "accessories": return "bg-gray-100 text-gray-700";
      case "audio": return "bg-gray-100 text-gray-700";
      case "wearables": return "bg-gray-100 text-gray-700";
      case "kitchen": return "bg-orange-50 text-orange-600 border border-orange-100";
      case "bathroom": return "bg-blue-50 text-blue-600 border border-blue-100";
      case "gadgets": return "bg-purple-50 text-purple-600 border border-purple-100";
      case "storage": return "bg-gray-100 text-gray-600 border border-gray-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
            <div className="flex items-center gap-4 mt-2">
              <Link href="/admin" className="text-sm font-black text-orange-500 uppercase tracking-widest border-b-2 border-orange-500 pb-1">
                Products
              </Link>
              <Link href="/admin/orders" className="text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest pb-1 border-b-2 border-transparent">
                Orders
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LogoutButton />
            <button 
              onClick={() => handleOpenModal()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-100 active:scale-95"
            >
              <Plus size={20} /> Add New Product
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-bottom border-gray-100">
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Stock</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors cursor-default">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                            {product.images[0] && (
                              <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain p-1" />
                            )}
                          </div>
                          <div className="font-bold text-gray-900 truncate max-w-[200px]">{product.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-black text-gray-900">Rs. {product.price.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        {product.stock < 10 ? (
                          <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Low Stock ({product.stock})
                          </span>
                        ) : product.stock <= 50 ? (
                          <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest">
                            In Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Good Stock ({product.stock})
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-1">
                          {product.isNew && <span className="w-2 h-2 rounded-full bg-blue-500" title="New" />}
                          {product.isTrending && <span className="w-2 h-2 rounded-full bg-orange-500" title="Trending" />}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all opacity-70 hover:opacity-100 cursor-pointer"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-70 hover:opacity-100 cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-none animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-12 flex-1 custom-scrollbar">
              {/* Group 1: Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                    placeholder="Product name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Group 2: Description */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium resize-none text-gray-900 placeholder-gray-400"
                  placeholder="Describe the product..."
                />
              </div>

              {/* Group 3: Pricing & Stock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price (Rs.)</label>
                  <input 
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Original Price</label>
                  <input 
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                    placeholder="1200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Stock</label>
                  <input 
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Group 4: Images */}
              <div className="space-y-6 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Product Images</label>
                    <p className="text-xs font-medium text-gray-500 mt-1">Upload up to 4 images (max 4MB each)</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{formData.images.length}/4</span>
                </div>

                {/* UploadThing Dropzone */}
                <div className={`border-2 border-dashed border-gray-300 rounded-[1.5rem] p-2 bg-white hover:bg-orange-50/50 hover:border-orange-300 transition-all group ${formData.images.length >= 4 ? 'opacity-50 pointer-events-none' : ''}`}>
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res) {
                        const newUrls = res.map(file => file.url);
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, ...newUrls].slice(0, 4)
                        }));
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{
                      container: "border-none py-6 cursor-pointer",
                      uploadIcon: "text-orange-500 group-hover:scale-110 transition-transform",
                      label: "text-gray-900 font-black tracking-tight",
                      allowedContent: "text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1",
                      button: "bg-gray-900 hover:bg-black text-white font-black px-8 py-3 rounded-xl mt-4 transition-all"
                    }}
                    content={{
                      label: formData.images.length >= 4 ? "Image limit reached (Max 4)" : "Drag & drop or click to upload images"
                    }}
                  />
                </div>

                {/* Fallback URL Input */}
                <div className="space-y-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Or add via URL</span>
                    </div>
                    {formData.images.length >= 4 && <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Limit Reached</span>}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      value={formData.imageUrlInput}
                      onChange={(e) => setFormData({...formData, imageUrlInput: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                      disabled={formData.images.length >= 4}
                      className="flex-1 px-5 py-3 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium disabled:opacity-50 text-gray-900 placeholder-gray-400"
                      placeholder={formData.images.length >= 4 ? "Limit reached" : "Paste image URL here..."}
                    />
                    <button 
                      type="button"
                      onClick={handleAddImage}
                      disabled={formData.images.length >= 4 || !formData.imageUrlInput.trim()}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-100 active:scale-95 disabled:opacity-50 disabled:bg-gray-400"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {/* Image Previews */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                    {formData.images.map((url, i) => (
                      <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden relative border border-gray-100 group shadow-sm">
                        <img src={url} alt="" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                        <button 
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg active:scale-90"
                        >
                          <X size={12} />
                        </button>
                        {i === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-[8px] font-black uppercase py-1 text-center tracking-widest">
                            Thumbnail
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-8 pt-4 border-t border-gray-50">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Mark as New Product</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({...formData, isTrending: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Mark as Trending</span>
                </label>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 pb-2 z-10">
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-orange-100 active:scale-[0.98] text-lg flex items-center justify-center gap-2"
                >
                  <Save size={20} /> {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
