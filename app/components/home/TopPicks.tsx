"use client";

import { useRef } from "react";
import ProductCard from "@/app/components/home/ProductCard";

const products = [
  { id: 1, image: "/picks-card/chicken-curry.jpg", name: "Chicken Curry Cut", pieces: "10 to 12 Pcs", weight: "960 - 1000 Gms", originalPrice: 355, salePrice: 349 },
  { id: 2, image: "/picks-card/sardine.webp", name: "Sardine - Mathi", pieces: "10-12 Pcs", weight: "Gross: 480-520 Gms | Net: 240-260 Gms", originalPrice: 165, salePrice: 159 },
  { id: 3, image: "/picks-card/prawns.webp", name: "Prawns Medium", pieces: "35-45 Pcs", weight: "Gross: 480-500 Gms | Net: 240-270 Gms", originalPrice: 205, salePrice: 199 },
  { id: 4, image: "/picks-card/Freshwater.webp", name: "Freshwater Pomfret", pieces: "6 to 8 Pcs", weight: "Gross: 500-700 Gms | Net: 350-490 Gms", originalPrice: 169, salePrice: 99 },
  { id: 5, image: "/picks-card/premium1.webp", name: "Chicken Breast Boneless", pieces: "2-3 Pcs", weight: "240 - 280 Gms", originalPrice: 185, salePrice: 179 },
  { id: 6, image: "/picks-card/premium2.webp", name: "Premium Curry Cut", pieces: "5 to 6 Pcs", weight: "480 - 500 Gms", originalPrice: 179, salePrice: 175 },
];

export default function TopPicks() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <h2 className="text-gray-900 font-bold text-lg md:text-xl mb-3 md:mb-4">
        Top Picks For You
      </h2>

      <div className="relative">
        {/* Left arrow — desktop only */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
        >
          ‹
        </button>

        {/* Scrollable product list */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              pieces={product.pieces}
              weight={product.weight}
              originalPrice={product.originalPrice}
              salePrice={product.salePrice}
              onAdd={() => console.log("Added:", product.id)}
            />
          ))}
        </div>

        {/* Right arrow — desktop only */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
        >
          ›
        </button>
      </div>
    </section>
  );
}