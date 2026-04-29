"use client";

import Link from "next/link";
import { useState } from "react";
import LoginDrawer from "@/app/components/ui/LoginDrawer";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Mobile search toggle

  return (
    <>
      <header className="bg-gradient-to-r from-[#ffe0e4] via-[#ffeff1] to-[#fff5f6] shadow-sm sticky top-0 z-50">

        {/* ── Desktop Navbar — md aur upar dikhega ── */}
        <div className="hidden md:flex max-w-7xl mx-auto px-16 py-3 items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="text-red-600 font-black text-2xl tracking-tight">
                TENDER<span className="text-red-500">♥</span>CUTS
                <span className="text-red-400 text-xs align-super">®</span>
              </span>
              <span className="text-gray-500 text-[10px] tracking-wide">
                Farm fresh meats &amp; fresh fish
              </span>
            </div>
          </Link>

          {/* Address */}
          <button className="flex items-start gap-1.5 text-left flex-shrink-0 ml-4 group">
            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div>
              <p className="text-base font-bold group-hover:text-red-600 transition-colors">Address</p>
              <p className="text-sm font-semibold">Thoraipakkam, Tamil Nadu, India</p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="w-[300px] mx-4 ml-12 mr-4">
            <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2.5 border border-gray-200 focus-within:border-red-400 transition-all">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Login */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 hover:text-red-600 transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
            <span className="text-sm font-bold">Login</span>
          </button>

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-1.5 ml-5 hover:text-red-600 transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13L5.4 5M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            <span className="text-sm font-bold">Cart</span>
          </Link>
        </div>

        {/* ── Mobile Navbar — sirf md se neeche dikhega ── */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">

          {/* Address — same style as desktop */}
          <button className="flex items-center gap-1.5 text-left">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div>
              <p className="text-sm font-bold">Address</p>
              <p className="text-xs font-semibold text-gray-600">
                Thoraipakkam, Tamil Nadu, India
              </p>
            </div>
          </button>

          {/* Search icon — tap karo toh input khulega */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-red-500 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile search bar — search icon tap karne pe expand hota hai */}
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2.5 border border-gray-200 focus-within:border-red-400 transition-all">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for meat, fish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
              {/* Close search */}
              <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-red-500 text-lg leading-none">
                ✕
              </button>
            </div>
          </div>
        )}

      </header>

      <LoginDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}