"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh(); // Force refresh to apply new middleware state
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="text-orange-500" size={32} />
            </div>
            
            <h1 className="text-2xl font-black text-gray-900 text-center mb-2 tracking-tight">Admin Login</h1>
            <p className="text-sm text-gray-500 text-center mb-8 font-medium">Please enter your credentials to continue</p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl flex items-center gap-2 border border-red-100">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder-gray-400"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={18} /> Login to Admin
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
