"use client";

// Mobile bottom cart bar — product add hone pe dikhta hai
// Cart pe click → login nahi? → LoginDrawer, login hai? → CartDrawer

import { useState, useEffect } from "react";
import { getCart, getCartTotal, getCartCount } from "@/app/lib/cartStore";

interface CartBarProps {
  onCartClick: () => void; // Parent handle karega — login check + drawer open
}

export default function CartBar({ onCartClick }: CartBarProps) {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const refresh = () => {
    setCount(getCartCount());
    setTotal(getCartTotal());
  };

  useEffect(() => {
    refresh();
    window.addEventListener("cartUpdated", refresh);
    return () => window.removeEventListener("cartUpdated", refresh);
  }, []);

  // Cart empty hai toh sirf back button dikhao
  if (count === 0) {
    return (
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <div className="flex justify-start">
          <button
            onClick={() => window.history.back()}
            className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Cart mein items hain — back + cart bar dikhao
  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
      <div className="flex items-center gap-3">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cart bar */}
        <button
          onClick={onCartClick}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 px-5 rounded-full flex items-center justify-between transition-colors shadow-lg"
        >
          {/* Left — item count */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13L5.4 5M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              {/* Green count badge */}
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            </div>
            <span className="text-sm">{count} item{count > 1 ? "s" : ""}</span>
          </div>

          {/* Right — total */}
          <span className="text-sm font-bold">₹{total}</span>
        </button>

      </div>
    </div>
  );
}