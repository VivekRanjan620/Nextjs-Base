// Dynamic product listing page
// URL: /chicken, /mutton, /seafood etc.

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// Dummy products — replace with real DB fetch later
// In real app: fetch("/api/products?category=chicken")
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

  // Get products for current category — fallback to empty array
  const products = allProducts[category] || [];

  // Format category name for display — "ready-to-cook" → "Ready To Cook"
  const categoryTitle = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">

      {/* ── Category Tabs — horizontal scroll ── */}
      {/* Desktop: visible at top, Mobile: hidden (BottomNav handles it) */}
      <div className="bg-gradient-to-r from-[#ffe0e4] via-[#ffeff1] to-[#fff5f6] border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>

            {/* Left arrow — desktop only */}
            <button className="hidden md:flex w-8 h-8 flex-shrink-0 items-center justify-center text-gray-500 hover:text-red-500">
              ‹
            </button>

            {categoryTabs.map((tab) => {
              const isActive = tab.href === `/${category}`;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 px-4 py-1 group"
                >
                  {/* Circle image */}
                  <div className={`w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-2 transition-all ${isActive ? "border-red-500" : "border-transparent"}`}>
                    <img src={tab.image} alt={tab.label} className="w-full h-full object-cover" />
                  </div>
                  {/* Label */}
                  <span className={`text-xs font-semibold ${isActive ? "text-red-500" : "text-gray-600"}`}>
                    {tab.label}
                  </span>
                  {/* Active underline */}
                  {isActive && <div className="w-full h-0.5 bg-red-500 rounded-full" />}
                </Link>
              );
            })}

            {/* Right arrow — desktop only */}
            <button className="hidden md:flex w-10 h-10 flex-shrink-0 items-center justify-center text-gray-500 hover:text-red-500">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-red-500 font-medium">{categoryTitle}</span>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found.</p>
        ) : (
          // Desktop: 3 columns, Mobile: 1 column
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">

                {/* Product image */}
                <div className="relative w-full h-[200px] md:h-[220px] bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

                  {/* Discount badge — top left green */}
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {product.discount}% Off
                    </span>
                  )}

                  {/* Antibiotic Free tag — bottom left red */}
                  {product.tag && (
                    <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-base leading-snug">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{product.sub}</p>

                  {/* Weight */}
                  {product.weight && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-gray-400 text-xs">🕐</span>
                      <p className="text-gray-500 text-xs">{product.weight}</p>
                    </div>
                  )}

                  {/* Price + Add button */}
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      {/* "Starts from" price */}
                      {product.startsFrom && (
                        <p className="text-gray-900 font-bold text-sm">
                          Starts from ₹{product.startsFrom}
                        </p>
                      )}

                      {/* MRP + Sale price */}
                      {product.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs line-through">₹{product.originalPrice}</span>
                          <span className="text-gray-900 font-bold text-base">₹{product.salePrice}</span>
                        </div>
                      )}
                    </div>

                    {/* Add button */}
                    <div className="flex flex-col items-end">
                      <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm">
                        Add
                      </button>
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

    </div>
  );
}