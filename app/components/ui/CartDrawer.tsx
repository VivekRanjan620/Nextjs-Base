"use client";

// Desktop pe right side se slide karta hai
// Login check — nahi hai toh LoginDrawer open karo

import { useState, useEffect } from "react";
import { getCart, updateQuantity, removeFromCart, getCartTotal, CartItem } from "@/app/lib/cartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginRequired: () => void; // Login nahi hai toh yeh call hoga
  isLoggedIn: boolean;
}

export default function CartDrawer({ isOpen, onClose, onLoginRequired, isLoggedIn }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cart update hone pe refresh karo
  const refreshCart = () => setItems(getCart());

  useEffect(() => {
    refreshCart();
    window.addEventListener("cartUpdated", refreshCart);
    return () => window.removeEventListener("cartUpdated", refreshCart);
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const total = getCartTotal();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-white z-50
        flex flex-col shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-gray-900 font-bold text-lg">Your Cart</h2>
        </div>

        {/* Apply Coupons */}
        <div className="mx-4 mt-4">
          <button className="w-full flex items-center justify-between border border-red-300 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-2">
              <span>🏷️</span>
              <span className="font-semibold text-sm">Apply Coupons</span>
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <span className="text-5xl">🛒</span>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-4">

                {/* Item info */}
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold text-sm leading-snug">{item.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.weight}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-xs line-through">₹{item.originalPrice * item.quantity}</span>
                    <span className="text-gray-900 font-bold text-sm">₹{item.price * item.quantity}</span>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center border border-red-400 rounded-full overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom — Proceed button */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-gray-100">
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  onClose();
                  onLoginRequired();
                } else {
                  // TODO: Checkout page pe jaao
                }
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-full flex items-center justify-between px-6 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🛒</span>
                <span>{itemCount}</span>
              </div>
              <span>₹{total}</span>
              <span>Proceed Delivery →</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}