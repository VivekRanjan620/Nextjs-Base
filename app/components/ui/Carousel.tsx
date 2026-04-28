"use client";

// components/ui/Carousel.tsx
// Auto-sliding banner carousel — TenderCuts style
// Arrows are OUTSIDE the image (left and right)
// Elite banner width matches carousel image width

import { useState, useEffect } from "react";

const slides = [
  { id: 1, image: "/banners/banners1.webp" },
  { id: 2, image: "/banners/banners2.webp" },
  { id: 3, image: "/banners/banners3.jpg" },
  { id: 4, image: "/banners/banners4.jpg" },
  { id: 5, image: "/banners/banners5.jpg" },
  { id: 6, image: "/banners/banners6.jpg" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="w-full py-4 max-w-7xl mx-auto px-4">

      {/* ── Row: Left Arrow + Image + Right Arrow ── */}
      <div className="flex items-center gap-3">

        {/* Left Arrow — bahar */}
        <button
          onClick={prev}
          className="w-9 h-9 flex-shrink-0 bg-white hover:bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold shadow transition-all"
        >
          ‹
        </button>

        {/* Image Box — flex-1 se poori remaining width lega */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={slides[current].image}
            alt={`Banner ${current + 1}`}
            className="w-full h-[380px] object-cover transition-opacity duration-500"
          />

          {/* Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current
                    ? "bg-white w-5 h-2"
                    : "bg-white/50 w-2 h-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow — bahar */}
        <button
          onClick={next}
          className="w-9 h-9 flex-shrink-0 bg-white hover:bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold shadow transition-all"
        >
          ›
        </button>

      </div>

      {/* ── Elite Banner ── */}
      {/* Same row structure — w-9 empty divs on both sides to match carousel width */}
      <div className="flex items-center gap-3 mt-3">

        {/* Empty space — left arrow ke barabar */}
        <div className="w-9 flex-shrink-0" />

        {/* Elite banner — flex-1 so it matches image width exactly */}
        <div className="flex-1 bg-red-800 rounded-xl px-6 py-4 flex items-center gap-4">
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 font-black text-xs text-center leading-tight">
              ELITE
            </span>
          </div>
          <p className="text-white text-sm font-medium flex-1">
            Enjoy Special Discounted Prices &amp; Unlimited Free Deliveries always.
          </p>
          <button className="border border-white text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-white hover:text-red-800 transition-all flex-shrink-0">
            KNOW MORE
          </button>
        </div>

        {/* Empty space — right arrow ke barabar */}
        <div className="w-9 flex-shrink-0" />

      </div>

    </div>
  );
}