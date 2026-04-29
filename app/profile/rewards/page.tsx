"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RewardsPage() {
  const router = useRouter();
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

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 text-center">
        <h1 className="text-base font-bold text-gray-800">Wallet &amp; Rewards</h1>
        <p className="text-gray-400 text-xs mt-1">
          View your wallet balance, rewards, and recent transactions. Tap on any section for more details!
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Wallet card — Image 3 jaisa */}
        <div className="bg-pink-50 rounded-2xl border-l-4 border-red-500 p-5">
          <div className="flex items-start justify-between">
            <div>
              {/* Logo small */}
              <p className="text-red-500 text-[10px] font-bold tracking-widest mb-2">
                TENDER♥CUTS
              </p>
              <p className="text-gray-500 text-4xl font-light">Wallet</p>
              <p className="text-gray-400 text-sm">Cash</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 text-4xl font-bold">
                <span className="text-2xl">₹</span>0
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button className="text-gray-500 text-xs flex items-center gap-1 hover:text-red-500 transition-colors">
              View more
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rewards card */}
        <div className="bg-pink-50 rounded-2xl border-r-4 border-red-500 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-red-500 text-4xl font-bold">
                0<span className="text-lg font-semibold">TC</span>
              </p>
              <p className="text-gray-400 text-xs mt-2">1 TC Reward = ₹1</p>
            </div>
            <div className="text-right">
              {/* Logo small right side */}
              <p className="text-red-500 text-[10px] font-bold tracking-widest mb-2">
                TENDER♥CUTS
              </p>
              <p className="text-gray-500 text-4xl font-light">Reward</p>
              <p className="text-gray-400 text-sm">Cash</p>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button className="text-gray-500 text-xs flex items-center gap-1 hover:text-red-500 transition-colors">
              View more
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}