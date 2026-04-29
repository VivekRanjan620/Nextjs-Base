"use client";

// Add to cart button — localStorage mein save
// Mobile: CartBar neeche dikhega
// Login check CartBar handle karega

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addToCart, getCart } from "@/app/lib/cartStore";
import CartBar from "@/app/components/ui/CartBar";
import CartDrawer from "@/app/components/ui/CartDrawer";
import LoginDrawer from "@/app/components/ui/LoginDrawer";

const allProducts: Record<string, any[]> = {
   chicken: [
    { id: 1, name: "Chicken Curry Cut (Skin Off)", sub: "Customise your product", weight: null, originalPrice: null, salePrice: null, startsFrom: 174, tag: "Antibiotic Free", discount: null, customisable: true, image: "/products/category/chicken/chicken-curry-skin-off.webp" },
    { id: 2, name: "Chicken Liver", sub: "Chicken Liver", weight: "190 - 210 Gms", originalPrice: 59, salePrice: 49, startsFrom: null, tag: "Antibiotic Free", discount: 17, customisable: false, image: "/products/chicken-liver.webp" },
    { id: 3, name: "Chicken Curry Cut (Skin On)", sub: "Customise your product", weight: null, originalPrice: null, salePrice: null, startsFrom: 149, tag: "Antibiotic Free", discount: null, customisable: true, image: "/products/chicken-curry-on.webp" },
    { id: 4, name: "Chicken Wings", sub: "18 - 20 Pieces", weight: "480 - 500 Gms", originalPrice: 150, salePrice: 155, startsFrom: null, tag: "Antibiotic Free", discount: null, customisable: false, image: "/products/chicken-wings.webp" },
    { id: 5, name: "Chicken Breast Boneless", sub: "Pack of 2", weight: "240 - 280 Gms", originalPrice: 185, salePrice: 179, startsFrom: null, tag: "Antibiotic Free", discount: null, customisable: false, image: "/products/chicken-breast.webp" },
    { id: 6, name: "Chicken Boneless (Cubes)", sub: "18 - 20 Pieces", weight: "480 - 500 Gms", originalPrice: 315, salePrice: 309, startsFrom: null, tag: "Antibiotic Free", discount: null, customisable: false, image: "/products/chicken-boneless.webp" },
  ],
   mutton: [
    { id: 1, name: "Chicken Curry Cut (Skin Off)", sub: "Customise your product", weight: null, originalPrice: null, salePrice: null, startsFrom: 174, tag: "Antibiotic Free", discount: null, customisable: true, image: "/products/chicken-curry-off.webp" },
    { id: 2, name: "Chicken Liver", sub: "Chicken Liver", weight: "190 - 210 Gms", originalPrice: 59, salePrice: 49, startsFrom: null, tag: "Antibiotic Free", discount: 17, customisable: false, image: "/products/chicken-liver.webp" },
    { id: 3, name: "Chicken Curry Cut (Skin On)", sub: "Customise your product", weight: null, originalPrice: null, salePrice: null, startsFrom: 149, tag: "Antibiotic Free", discount: null, customisable: true, image: "/products/chicken-curry-on.webp" },
    { id: 4, name: "Chicken Wings", sub: "18 - 20 Pieces", weight: "480 - 500 Gms", originalPrice: 150, salePrice: 155, startsFrom: null, tag: "Antibiotic Free", discount: null, customisable: false, image: "/products/chicken-wings.webp" },
    { id: 5, name: "Chicken Breast Boneless", sub: "Pack of 2", weight: "240 - 280 Gms", originalPrice: 185, salePrice: 179, startsFrom: null, tag: "Antibiotic Free", discount: null, customisable: false, image: "/products/chicken-breast.webp" },
    { id: 6, name: "Chicken Boneless (Cubes)", sub: "18 - 20 Pieces", weight: "480 - 500 Gms", originalPrice: 315, salePrice: 309, startsFrom: null, tag: "Antibiotic Free", discount: null, customisable: false, image: "/products/chicken-boneless.webp" },
  ],
};

// Category nav tabs — horizontal scroll on mobile
const categoryTabs = [
  { label: "Chicken",       href: "/chicken",       image: "/Category/wallpaper/chicken.png" },
  { label: "Mutton",        href: "/mutton",        image: "/Category/wallpaper/mutton.png" },
  { label: "Sea Food",      href: "/seafood",       image: "/Category/wallpaper/seafood.png" },
  { label: "Ready To Cook", href: "/ready-to-cook", image: "/Category/wallpaper/readycook.png" },
  { label: "Biryani",       href: "/biryani",       image: "/Category/wallpaper/biryani.png" },
  { label: "Snacks",        href: "/snacks",        image: "/Category/wallpaper/snacks.png" },
  { label: "Pre book",      href: "/prebook",        image: "/Category/wallpaper/prebook.png"     },
  { label: "Elite offers",  href: "/elite-offers",   image: "/Category/wallpaper/elite.png" },
  { label: "Cold cuts",     href: "/cold-cuts",      image: "/Category/wallpaper/coldcuts.png" },
  { label: "Eggs",          href: "/eggs",           image: "/Category/wallpaper/eggs.png" },
  { label: "Pickles",       href: "/pickles",        image: "/Category/wallpaper/pickles.png" },
  { label: "Spices",        href: "/spices",        image: "/Category/wallpaper/spices.png" },
  { label: "Dry fish",      href: "/dry-fish",       image: "/Category/wallpaper/dryfish.png" },
];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const products = allProducts[category] || [];

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Track which products are in cart for UI
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  // Check login + cart on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setIsLoggedIn(d.success));

    refreshCartItems();
    window.addEventListener("cartUpdated", refreshCartItems);
    return () => window.removeEventListener("cartUpdated", refreshCartItems);
  }, []);

  const refreshCartItems = () => {
    const cart = getCart();
    const map: Record<number, number> = {};
    cart.forEach((item) => { map[item.id] = item.quantity; });
    setCartItems(map);
  };

  const handleAdd = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      originalPrice: product.originalPrice,
      weight: product.weight,
      image: product.image,
    });
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setLoginDrawerOpen(true);
    } else {
      setCartDrawerOpen(true);
    }
  };

  const categoryTitle = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="bg-gray-50 min-h-screen pb-28 md:pb-0">

      {/* Category Tabs */}
      <div className="bg-gradient-to-r from-[#ffe0e4] via-[#ffeff1] to-[#fff5f6] border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            <button className="hidden md:flex w-8 h-8 flex-shrink-0 items-center justify-center text-gray-500 hover:text-red-500">‹</button>
            {categoryTabs.map((tab) => {
              const isActive = tab.href === `/${category}`;
              return (
                <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1.5 flex-shrink-0 px-4 py-1 group">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all ${isActive ? "border-red-500" : "border-transparent"}`}>
                    <img src={tab.image} alt={tab.label} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? "text-red-500" : "text-gray-600"}`}>{tab.label}</span>
                  {isActive && <div className="w-full h-0.5 bg-red-500 rounded-full" />}
                </Link>
              );
            })}
            <button className="hidden md:flex w-8 h-8 flex-shrink-0 items-center justify-center text-gray-500 hover:text-red-500">›</button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-red-500 font-medium">{categoryTitle}</span>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">

                {/* Image */}
                <div className="relative w-full h-[200px] md:h-[220px] bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {product.discount}% Off
                    </span>
                  )}
                  {product.tag && (
                    <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-base leading-snug">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{product.sub}</p>
                  {product.weight && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-gray-400 text-xs">🕐</span>
                      <p className="text-gray-500 text-xs">{product.weight}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      {product.startsFrom && (
                        <p className="text-gray-900 font-bold text-sm">Starts from ₹{product.startsFrom}</p>
                      )}
                      {product.originalPrice && !product.startsFrom && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs line-through">₹{product.originalPrice}</span>
                          <span className="text-gray-900 font-bold text-base">₹{product.salePrice}</span>
                        </div>
                      )}
                    </div>

                    {/* Add button — agar cart mein hai toh quantity controls */}
                    <div className="flex flex-col items-end">
                      {cartItems[product.id] ? (
                        // Already in cart — show quantity controls
                        <div className="flex items-center border-2 border-red-500 rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              const { updateQuantity } = require("@/app/lib/cartStore");
                              updateQuantity(product.id, cartItems[product.id] - 1);
                            }}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 font-bold text-lg"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{cartItems[product.id]}</span>
                          <button
                            onClick={() => handleAdd(product)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 font-bold text-lg"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        // Not in cart — Add button
                        <button
                          onClick={() => handleAdd(product)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm"
                        >
                          Add
                        </button>
                      )}
                      {product.customisable && (
                        <span className="text-gray-400 text-[10px] mt-0.5">customisable</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile CartBar — neeche fixed */}
      <CartBar onCartClick={handleCartClick} />

      {/* Cart Drawer — desktop */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onLoginRequired={() => setLoginDrawerOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* Login Drawer */}
      <LoginDrawer
        isOpen={loginDrawerOpen}
        onClose={() => setLoginDrawerOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setLoginDrawerOpen(false);
          setCartDrawerOpen(true); // Login ke baad cart open karo
        }}
      />
    </div>
  );
}