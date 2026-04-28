"use client";

// app/(auth)/login/page.tsx
// TenderCuts style login page
// Top: image carousel, Bottom: mobile number form
// Connected to existing /api/auth/login

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Login page carousel — product images
const slides = [
  { id: 1, image: "/banners/banners1.webp" },
  { id: 2, image: "/banners/banners2.webp" },
  { id: 3, image: "/banners/banners3.webp" },
  { id: 4, image: "/banners/banners4.webp" },
  { id: 5, image: "/banners/banners5.webp" },
];

export default function LoginPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
    setIsSuccess(data.success);
    setIsLoading(false);

    if (data.success) {
      // Redirect based on role
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">

      {/* ── Top: Image Carousel ── */}
      <div className="relative w-full h-[55vh] bg-gray-100 overflow-hidden">

        {/* Slide image */}
        <img
          src={slides[current].image}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* Skip button — top right */}
        <Link
          href="/"
          className="absolute top-4 right-4 border border-red-500 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full bg-white hover:bg-red-50 transition-colors"
        >
          Skip
        </Link>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${
                i === current
                  ? "bg-red-500 w-4 h-2.5"   // Active dot — red
                  : "bg-gray-300 w-2.5 h-2.5" // Inactive dot — gray
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom: Login Form ── */}
      <div className="flex-1 px-6 pt-8 pb-6 flex flex-col">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Sign Up / Log In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-b border-gray-300 focus:border-red-500 outline-none text-gray-800 text-base py-2 placeholder-gray-400 transition-colors bg-transparent"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border-b border-gray-300 focus:border-red-500 outline-none text-gray-800 text-base py-2 placeholder-gray-400 transition-colors bg-transparent"
            />
          </div>

          {/* Error / success message */}
          {message && (
            <p className={`text-sm text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>
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

        {/* Terms and privacy */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-red-500 hover:underline">
            Terms &amp; Conditions
          </Link>
          {" | "}
          <Link href="/privacy" className="text-red-500 hover:underline">
            Privacy Policy
          </Link>
        </p>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-500 font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}