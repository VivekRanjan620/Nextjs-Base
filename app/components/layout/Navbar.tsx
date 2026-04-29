"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginDrawer from "@/app/components/ui/LoginDrawer";
import CartDrawer from "@/app/components/ui/CartDrawer";
import { getCartCount } from "@/app/lib/cartStore";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkUser = () => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) setUser(data.user);
        else setUser(null);
      });
  };

  // Cart count refresh karo
  const refreshCartCount = () => setCartCount(getCartCount());

  useEffect(() => {
    checkUser();
    refreshCartCount();
    // cartUpdated event listen karo — product add/remove hone pe
    window.addEventListener("cartUpdated", refreshCartCount);
    return () => window.removeEventListener("cartUpdated", refreshCartCount);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setProfileOpen(false);
    router.push("/");
  };

  // Cart icon click handler — login check
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setDrawerOpen(true); // Login nahi — LoginDrawer open
    } else {
      setCartDrawerOpen(true); // Login hai — CartDrawer open
    }
  };

  const profileLinks = [
    { label: "My Profile",              href: "/profile/my-profile" },
    { label: "My Orders",               href: "/profile/orders"     },
    { label: "TenderCuts Elite",        href: "/profile/elite"      },
    { label: "Tender Rewards & Wallet", href: "/profile/rewards"    },
    { label: "Help & Support",          href: "/profile/support"    },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-[#ffe0e4] via-[#ffeff1] to-[#fff5f6] shadow-sm sticky top-0 z-50">

        {/* ── Desktop Navbar ── */}
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

          {/* Search */}
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

          {/* Profile OR Login */}
          {user ? (
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 hover:text-red-600 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold">Profile</span>
                <svg
                  className={`w-3 h-3 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-10 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 text-sm text-purple-600 hover:bg-purple-50 border-b border-gray-50 transition-colors"
                    >
                      ⚡ Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 hover:text-red-600 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              <span className="text-sm font-bold">Login</span>
            </button>
          )}

          {/* Cart — count badge + click handler */}
          <button
            onClick={handleCartClick}
            className="flex items-center gap-1.5 ml-5 hover:text-red-600 transition-colors flex-shrink-0 relative"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13L5.4 5M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              {/* Cart count badge — sirf tab dikhega jab items hain */}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-sm font-bold">Cart</span>
          </button>
        </div>

        {/* ── Mobile Navbar ── */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <button className="flex items-center gap-1.5 text-left">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div>
              <p className="text-sm font-bold">Address</p>
              <p className="text-xs font-semibold text-gray-600">Thoraipakkam, Tamil Nadu, India</p>
            </div>
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-red-500 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
        </div>

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
              <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-red-500 text-lg leading-none">✕</button>
            </div>
          </div>
        )}
      </header>

      {/* LoginDrawer */}
      <LoginDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLoginSuccess={() => {
          checkUser();
          setDrawerOpen(false);
          setCartDrawerOpen(true); // Login ke baad cart open karo
        }}
      />

      {/* CartDrawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onLoginRequired={() => {
          setCartDrawerOpen(false);
          setDrawerOpen(true);
        }}
        isLoggedIn={!!user}
      />
    </>
  );
}