"use client";

// components/layout/Footer.tsx
// Full footer — uses our reusable components:
// Input.tsx     → Newsletter email field
// Button.tsx    → Subscribe button
// Badge.tsx     → "New" tag on certain links
// Toast.tsx     → Success/error notification on subscribe

import Link from "next/link";
import { useState } from "react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import { useToast, ToastContainer } from "@/app/components/ui/Toast";

// Footer columns data — update links here without touching JSX
const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Home",      href: "/",          isNew: false },
      { label: "Features",  href: "/#features", isNew: false },
      { label: "Dashboard", href: "/dashboard", isNew: false },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login",    href: "/login",             isNew: false },
      { label: "Register", href: "/register",           isNew: false },
      { label: "Profile",  href: "/dashboard/profile", isNew: true }, // Badge dikhega
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",        href: "/about",   isNew: false },
      { label: "Contact",         href: "/contact", isNew: false },
      { label: "Privacy Policy",  href: "/privacy", isNew: false },
    ],
  },
];

// Social media links — update href with your real profiles
const socialLinks = [
  { label: "GitHub",    icon: "🐙", href: "https://github.com" },
  { label: "Twitter",   icon: "🐦", href: "https://twitter.com" },
  { label: "LinkedIn",  icon: "💼", href: "https://linkedin.com" },
  { label: "Instagram", icon: "📸", href: "https://instagram.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useToast hook — from our reusable Toast component
  // gives us: toast.success(), toast.error(), toast.warning()
  const toast = useToast();

  // Newsletter subscribe handler
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show warning toast if email is empty — reusing Toast component
    if (!email) {
      toast.warning("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    // TODO: Replace with real newsletter API call later
    await new Promise((res) => setTimeout(res, 1000));

    // Show success toast — reusing Toast component
    toast.success("You are subscribed! Welcome aboard 🎉");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">

      {/* ── Main Content — Brand + Nav Columns ── */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 — Brand + Description + Social Icons */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-white font-bold text-xl">
            ⚡ MyApp
          </Link>

          <p className="text-sm leading-relaxed">
            A full-stack platform built with Next.js and MySQL.
            Secure, fast, and ready to scale.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center hover:border-blue-500 hover:text-white transition-all text-base"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Columns 2, 3, 4 — Nav Links */}
        {footerLinks.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">

            {/* Column heading */}
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              {col.heading}
            </h4>

            {/* Links list */}
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>

                  {/* Reusable Badge — only shows if isNew is true */}
                  {link.isNew && (
                    <Badge label="New" variant="info" size="sm" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Newsletter Section ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          <div>
            <p className="text-white font-semibold text-sm">Stay up to date</p>
            <p className="text-sm mt-0.5">Get the latest updates delivered to your inbox.</p>
          </div>

          {/* Form — uses reusable Input + Button */}
          <form
            onSubmit={handleSubscribe}
            className="flex gap-2 w-full sm:w-auto items-end"
          >
            {/* Reusable Input component */}
            <div className="flex-1 sm:w-64">
              <Input
                label=""
                name="newsletter-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Reusable Button component — isLoading spinner built in */}
            <Button
              label="Subscribe"
              type="submit"
              variant="primary"
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Toast container — bottom-right corner notifications */}
      {/* Reusable Toast component — manages all toast messages */}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

    </footer>
  );
}