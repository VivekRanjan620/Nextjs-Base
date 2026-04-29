"use client";
import { useState } from "react";

const plans = [
  { id: "1m", label: "1 Month Plan", savings: "Savings upto ₹500",  price: 89,  popular: false },
  { id: "3m", label: "3 Months Plan", savings: "Savings upto ₹1500", price: 239, popular: true  },
  { id: "6m", label: "6 Months Plan", savings: "Savings upto ₹3000", price: 449, popular: false },
];

const advantages = [
  { icon: "🛵", label: "Unlimited Free Deliveries" },
  { icon: "💰", label: "Super Savings" },
  { icon: "🏪", label: "Avail Offers Online & In Stores" },
];

export default function ElitePage() {
  const [selectedPlan, setSelectedPlan] = useState("1m");

  const selected = plans.find((p) => p.id === selectedPlan)!;

  return (
    <div className="bg-white min-h-screen">

      {/* Top section — red background with Elite branding */}
      <div className="bg-white pt-8 pb-4 px-4 text-center relative overflow-hidden">

        {/* Elite logo card */}
        <div className="inline-block bg-red-600 rounded-2xl px-10 py-6 mb-4 shadow-lg">
          <div className="text-white font-black text-3xl tracking-tight">
            TENDER<span className="text-red-200">♥</span>CUTS
          </div>
          <div className="text-white font-black text-5xl italic mt-1">Elite</div>
          <div className="text-red-200 text-xs mt-1">👑</div>
        </div>

        <p className="text-gray-600 text-sm font-medium mb-2">
          Enjoy Discounted Prices &amp; Unlimited Free Deliveries Always
        </p>
      </div>

      {/* Advantages box */}
      <div className="max-w-lg mx-auto px-4 mb-0">
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-center text-gray-700 font-semibold text-sm mb-4">
            Advantages of Elite
          </p>
          <div className="flex justify-around">
            {advantages.map((adv) => (
              <div key={adv.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{adv.icon}</span>
                <p className="text-gray-600 text-xs text-center max-w-[80px] leading-tight">
                  {adv.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Choose plan section — red background */}
      <div className="bg-red-600 mt-6 px-4 pt-5 pb-8">
        <p className="text-center text-white font-semibold text-sm mb-4">
          Choose your plan
        </p>

        {/* Plan cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`rounded-xl p-3 text-left transition-all ${
                selectedPlan === plan.id
                  ? "bg-white shadow-md"
                  : "bg-red-500 border border-red-400"
              }`}
            >
              <p className={`text-xs font-bold leading-tight ${
                selectedPlan === plan.id ? "text-gray-800" : "text-white"
              }`}>
                {plan.label}
              </p>
              <p className={`text-[10px] mt-1 ${
                selectedPlan === plan.id ? "text-gray-500" : "text-red-200"
              }`}>
                {plan.savings}
              </p>
            </button>
          ))}
        </div>

        {/* Price + Continue button */}
        <div className="flex items-center gap-3">
          <div className="text-white">
            <span className="text-sm">₹</span>
            <span className="text-3xl font-bold">{selected.price}</span>
          </div>
          <button className="flex-1 bg-white text-red-600 font-bold py-4 rounded-full text-sm hover:bg-gray-50 transition-colors">
            CONTINUE
          </button>
        </div>
      </div>

    </div>
  );
}