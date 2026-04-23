"use client";

// components/forms/RegisterForm.tsx
// Uses reusable components: FormCard, Input, Button
// Same pattern as LoginForm — consistent across all forms!

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/app/components/ui/FormCard";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function RegisterForm() {
  const router = useRouter();

  // Form field values — register needs name too
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Message state with success tracking
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Loading state while API call is in progress
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
    setIsSuccess(data.success);
    setIsLoading(false);

    // On success redirect to login after short delay
    // so user can read the success message
    if (data.success) {
      setTimeout(() => router.push("/login"), 1500);
    }
  };

  return (
    // FormCard handles outer box — only props change vs LoginForm
    <FormCard
      title="Create Account 🚀"
      subtitle="Join us today — it's free"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      {/* Name input */}
      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="John Doe"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      {/* Email input */}
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
        placeholder="Minimum 8 characters"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      {/* Success or error message */}
      {message && (
        <p className={`text-sm text-center ${isSuccess ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}

      {/* Submit button */}
      <Button
        label="Create Account"
        type="submit"
        onClick={handleSubmit as any}
        isLoading={isLoading}
        fullWidth
      />
    </FormCard>
  );
}