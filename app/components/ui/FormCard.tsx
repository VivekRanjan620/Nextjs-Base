// components/ui/FormCard.tsx
// Reusable form wrapper — the white/dark box that wraps login, register forms
// Instead of repeating the same styled div in every form, use this component
// Used in: LoginForm, RegisterForm, any future form page

import { ReactNode } from "react";
import Link from "next/link";

interface FormCardProps {
  title: string;            // Main heading e.g. "Welcome Back"
  subtitle?: string;        // Smaller text below heading
  children: ReactNode;      // Form fields go here
  footerText?: string;      // Text at bottom e.g. "Don't have an account?"
  footerLinkText?: string;  // Link text e.g. "Register"
  footerLinkHref?: string;  // Link destination e.g. "/register"
}

export default function FormCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: FormCardProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">

        {/* Form heading */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>

        {/* Form fields — passed as children */}
        <div className="flex flex-col gap-4">
          {children}
        </div>

        {/* Footer link — e.g. "Don't have an account? Register" */}
        {footerText && footerLinkText && footerLinkHref && (
          <p className="text-center text-sm text-gray-500 mt-6">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {footerLinkText}
            </Link>
          </p>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Login form:
// <FormCard
//   title="Welcome Back"
//   subtitle="Login to your account"
//   footerText="Don't have an account?"
//   footerLinkText="Register"
//   footerLinkHref="/register"
// >
//   <Input ... />
//   <Button ... />
// </FormCard>
//
// Register form:
// <FormCard
//   title="Create Account"
//   subtitle="Join us today"
//   footerText="Already have an account?"
//   footerLinkText="Login"
//   footerLinkHref="/login"
// >
//   <Input ... />
//   <Button ... />
// </FormCard>