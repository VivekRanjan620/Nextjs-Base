"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"live" | "past">("live");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) router.push("/");
        else setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Mobile header */}
      <div className="md:hidden bg-white px-4 py-3 border-b border-gray-100">
        <h1 className="text-base font-semibold text-gray-800">My Orders</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">

        {/* Tabs — Live Orders | Past Orders */}
        <div className="flex border-b border-gray-200 mb-6 bg-white">
          <button
            onClick={() => setActiveTab("live")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === "live"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Live Orders
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === "past"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Past Orders
          </button>
        </div>

        {/* Empty state — Image 1 jaisa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-16 flex flex-col items-center justify-center">
          {/* Cart icon — gray */}
          <svg className="w-20 h-20 text-gray-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13L5.4 5M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          <p className="text-gray-400 text-sm">
            No orders to display. Are you not hungry ?
          </p>
        </div>

      </div>
    </div>
  );
}