"use client";

// components/forms/LoginForm.tsx
// Uses reusable components: FormCard, Input, Button
// Notice how clean this file is now — no styling here at all!
// All styling is handled inside the reusable components

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/app/components/ui/FormCard";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();

  // Form field values
  const [form, setForm] = useState({ email: "", password: "" });

  // Separate states for message text and whether it was a success
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Loading state — disables button while API call is happening
  const [isLoading, setIsLoading] = useState(false);

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
      // Redirect based on role returned from API
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    // FormCard handles the outer box, heading, and footer link
    <FormCard
      title="Welcome Back 👋"
      subtitle="Login to your account"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
      {/* Email input — reusable Input component */}
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      {/* Password input */}
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      {/* Success or error message — color changes based on isSuccess */}
      {message && (
        <p className={`text-sm text-center ${isSuccess ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}

      {/* Submit button — reusable Button component */}
      <Button
        label="Login"
        type="submit"
        onClick={handleSubmit as any}
        isLoading={isLoading}
        fullWidth
      />
    </FormCard>
  );
}