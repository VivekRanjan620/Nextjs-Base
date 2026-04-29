"use client";
import { useState } from "react";

const helpTopics = [
  "About TenderCuts",
  "Product related queries",
  "About home delivery",
  "Cancellation & Refund policy",
  "Other queries",
  "Returns and replacement policy",
  "Payment related queries",
  "TenderCuts rewards program",
  "TenderCuts Elite FAQs",
  "Profile related queries",
  "Queries on current online order",
  "Queries on self pick up orders",
  "Any other queries",
];

export default function SupportPage() {
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen">

      {/* Mobile header */}
      <div className="md:hidden bg-white px-4 py-3 border-b border-gray-100">
        <h1 className="text-base font-semibold text-gray-800">Help & Support</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Heading — Image 4 jaisa */}
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide mb-6">
          Help with other queries
        </h2>

        {/* Topics list */}
        <div className="space-y-2">
          {helpTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setOpenTopic(openTopic === topic ? null : topic)}
              className="w-full flex items-center justify-between bg-red-50 hover:bg-red-100 px-5 py-4 rounded-lg transition-colors text-left"
            >
              <span className="text-gray-800 text-sm font-medium">{topic}</span>
              <svg
                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                  openTopic === topic ? "rotate-90" : ""
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}