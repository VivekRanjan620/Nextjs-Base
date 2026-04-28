"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { id: 1, image: "/banners/banners1.webp" },
  { id: 2, image: "/banners/banners2.webp" },
  { id: 3, image: "/banners/banners3.jpg" },
  { id: 4, image: "/banners/banners4.jpg" },
  { id: 5, image: "/banners/banners5.jpg" },
];

interface LoginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDrawer({ isOpen, onClose }: LoginDrawerProps) {
  const [current, setCurrent] = useState(0);
  const [mobile, setMobile] = useState("");   // Only mobile number
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation — 10 digit number
    if (!mobile || mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    // TODO: Connect to OTP API later
    // For now just show success message
    setMessage("OTP sent to +91 " + mobile);
    setIsLoading(false);
  };

  return (
    <>
      {/* Dark overlay — click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer — slides from right */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-white z-50
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ── Top: Carousel ── */}
        <div className="relative w-full h-[55%] bg-gray-100 overflow-hidden flex-shrink-0">
          <img
            src={slides[current].image}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Skip button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 border border-red-500 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full bg-white hover:bg-red-50 transition-colors"
          >
            Skip
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current
                    ? "bg-red-500 w-4 h-2.5"
                    : "bg-gray-300 w-2.5 h-2.5"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom: Form ── */}
        <div className="flex-1 px-6 pt-8 pb-6 flex flex-col">

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Sign Up / Log In
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Mobile number input with +91 prefix */}
            <div className="flex items-center border-b border-gray-300 focus-within:border-red-500 transition-colors gap-2 pb-1">
              <span className="text-gray-500 text-base">+91</span>
              <div className="w-px h-5 bg-gray-300" />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                maxLength={10}
                onChange={(e) => {
                  // Only allow numbers
                  const val = e.target.value.replace(/\D/g, "");
                  setMobile(val);
                  setMessage("");
                }}
                className="flex-1 outline-none text-gray-800 text-base py-1 placeholder-gray-400 bg-transparent"
              />
            </div>

            {/* Message */}
            {message && (
              <p className={`text-sm ${message.includes("OTP") ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}

            {/* Continue button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-full text-base transition-colors disabled:opacity-60 mt-2"
            >
              {isLoading ? "Please wait..." : "Continue"}
            </button>

          </form>

          {/* Terms */}
          <p className="text-center text-xs text-gray-400 mt-5">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-red-500 hover:underline" onClick={onClose}>
              Terms &amp; Conditions
            </Link>
            {" | "}
            <Link href="/privacy" className="text-red-500 hover:underline" onClick={onClose}>
              Privacy Policy
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}