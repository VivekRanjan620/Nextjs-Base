"use client";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="w-full py-2 md:py-4 max-w-7xl mx-auto px-0 md:px-4">

      {/* Desktop — arrows bahar, Mobile — full width */}
      <div className="flex items-center gap-3">

        {/* Left arrow — desktop only */}
        <button
          onClick={prev}
          className="hidden md:flex w-9 h-9 flex-shrink-0 bg-white hover:bg-gray-100 border border-gray-200 rounded-full items-center justify-center text-gray-600 text-xl font-bold shadow transition-all"
        >
          ‹
        </button>

        {/* Image */}
        <div className="relative flex-1 overflow-hidden bg-gray-100 rounded-none md:rounded-2xl">
          <img
            src={slides[current].image}
            alt={`Banner ${current + 1}`}
            className="w-full h-[180px] sm:h-[240px] md:h-[380px] object-cover transition-opacity duration-500"
          />

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current ? "bg-white w-5 h-2" : "bg-white/50 w-2 h-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right arrow — desktop only */}
        <button
          onClick={next}
          className="hidden md:flex w-9 h-9 flex-shrink-0 bg-white hover:bg-gray-100 border border-gray-200 rounded-full items-center justify-center text-gray-600 text-xl font-bold shadow transition-all"
        >
          ›
        </button>
      </div>

      {/* Elite Banner */}
      <div className="flex items-center gap-3 mt-3 px-4 md:px-0">
        <div className="hidden md:block w-9 flex-shrink-0" />
        <div className="flex-1 bg-red-800 rounded-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
          <div className="bg-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 font-black text-[10px] text-center leading-tight">ELITE</span>
          </div>
          <p className="text-white text-xs md:text-sm font-medium flex-1">
            Enjoy Special Discounted Prices &amp; Unlimited Free Deliveries always.
          </p>
          <button className="border border-white text-white text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-white hover:text-red-800 transition-all flex-shrink-0">
            KNOW MORE
          </button>
        </div>
        <div className="hidden md:block w-9 flex-shrink-0" />
      </div>

    </div>
  );
}