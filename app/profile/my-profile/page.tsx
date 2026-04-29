"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Profile sections — Image 1 + 2 jaisa
const profileSections = [
  { title: "My Address", subtitle: "Edit & Add New Addresses", href: "/address", hasArrow: false },
  {
    title: "Manage Wallet & Payment", subtitle: "Wallets & Payments", href: "/wallet",
    hasArrow: true,
    children: [
      { label: "Manage Wallet & Rewards", href: "/wallet/rewards" }
    ]
  },
  { title: "TenderCuts Elite", subtitle: "Plan Details", href: "/elite", hasArrow: false },
  {
    title: "Help & Support", subtitle: "FAQs, Contact...", href: "/support",
    hasArrow: true, children: []
  },
  {
    title: "About TenderCuts", subtitle: "WhyTenderCuts, TenderCuts Safety...",
    href: "/about", hasArrow: true, children: []
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) {
          router.push("/"); // Login nahi hai toh homepage
        } else {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"/>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">

      {/* Mobile top header */}
      <div className="md:hidden bg-white px-4 py-3 border-b border-gray-100">
        <h1 className="text-base font-semibold text-gray-800">Profile</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">

        {/* User card — Image 1 + 2 jaisa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            {/* Avatar circle */}
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-gray-800 font-bold text-base uppercase tracking-wide">
                  {user?.name}
                </h2>
                {/* Edit icon */}
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Elite banner */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-lg p-4 flex items-center gap-3">
            <div className="bg-red-600 rounded px-2 py-1 flex-shrink-0">
              <span className="text-white font-black text-xs">Elite</span>
            </div>
            <p className="text-gray-600 text-xs flex-1">
              Over <span className="font-bold text-gray-800">90%</span> of our ELITE members are saving{" "}
              <span className="font-bold text-gray-800">₹200</span> per month with ELITE.
            </p>
            <button className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex-shrink-0">
              Join Elite
            </button>
          </div>
        </div>

        {/* Profile sections list — Image 1 + 2 jaisa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {profileSections.map((section, i) => (
            <div key={section.title}>
              <button
                onClick={() => {
                  if (section.children && section.children.length > 0) {
                    setOpenSection(openSection === section.title ? null : section.title);
                  } else {
                    router.push(section.href);
                  }
                }}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{section.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{section.subtitle}</p>
                </div>
                {section.hasArrow && (
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${openSection === section.title ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                )}
              </button>

              {/* Expanded children */}
              {openSection === section.title && section.children && section.children.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {section.children.map((child) => (
                    <Link key={child.label} href={child.href}
                      className="flex items-center justify-between px-7 py-3 text-sm text-gray-600 hover:text-red-500 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">🎁</span>
                        {child.label}
                      </div>
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              )}

              {/* Divider — last item pe nahi */}
              {i < profileSections.length - 1 && (
                <div className="border-b border-gray-100 mx-5"/>
              )}
            </div>
          ))}
        </div>

        {/* Logout button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full px-5 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* App version */}
        <p className="text-center text-gray-400 text-xs mt-6">App version: 1.0.0</p>

      </div>
    </div>
  );
}