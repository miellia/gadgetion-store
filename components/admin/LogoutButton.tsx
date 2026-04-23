"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      Logout
    </button>
  );
}
