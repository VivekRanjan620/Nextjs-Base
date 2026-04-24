"use client";

// Toast.tsx — Corner notification component
// Shows temporary messages like "Saved!", "Error!", "User deleted"
// Automatically disappears after a few seconds
// Two parts: 1) Toast UI component  2) useToast hook to control it

import { useEffect, useState } from "react";

// Shape of a single toast message
export interface ToastData {
  id: number;                                    // Unique ID for each toast
  message: string;                               // Text to display
  type: "success" | "error" | "warning" | "info"; // Controls color and icon
}

// ─── Toast UI Component ───────────────────────
// Renders one single toast notification

interface ToastProps {
  toast: ToastData;
  onRemove: (id: number) => void; // Called when toast should disappear
}

function ToastItem({ toast, onRemove }: ToastProps) {

  // Auto-remove after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer); // Cleanup if removed early
  }, [toast.id, onRemove]);

  // Style and icon per type
  const styles = {
    success: { bg: "bg-green-600",  icon: "✅" },
    error:   { bg: "bg-red-600",    icon: "❌" },
    warning: { bg: "bg-yellow-500", icon: "⚠️" },
    info:    { bg: "bg-blue-600",   icon: "ℹ️" },
  };

  const { bg, icon } = styles[toast.type];

  return (
    <div
      className={`
        ${bg} text-white px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3 min-w-[260px] max-w-sm
        animate-fade-in
      `}
    >
      <span>{icon}</span>
      <p className="text-sm font-medium flex-1">{toast.message}</p>

      {/* Manual close button */}
      <button
        onClick={() => onRemove(toast.id)}
        className="text-white/70 hover:text-white transition-colors text-sm"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Toast Container ──────────────────────────
// Renders all active toasts in the bottom-right corner

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    // Fixed position — always in bottom-right corner
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ─── useToast Hook ────────────────────────────
// Custom hook — manages toast list, add and remove toasts
// Import this in any component that needs to show notifications

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Add a new toast
  const showToast = (message: string, type: ToastData["type"] = "info") => {
    const id = Date.now(); // Unique ID using timestamp
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Remove a toast by ID
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Shorthand helpers
  const success = (msg: string) => showToast(msg, "success");
  const error   = (msg: string) => showToast(msg, "error");
  const warning = (msg: string) => showToast(msg, "warning");
  const info    = (msg: string) => showToast(msg, "info");

  return { toasts, removeToast, success, error, warning, info };
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Step 1 — Import in your component:
// import { useToast, ToastContainer } from "@/components/ui/Toast";
//
// Step 2 — Use the hook:
// const toast = useToast();
//
// Step 3 — Show notifications anywhere:
// toast.success("User saved successfully!");
// toast.error("Something went wrong.");
// toast.warning("Please fill all fields.");
// toast.info("Loading your data...");
//
// Step 4 — Add ToastContainer once (in layout or page):
// <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
//
// Full example in a component:
// export default function AdminPage() {
//   const toast = useToast();
//
//   const handleDelete = async () => {
//     const res = await fetch("/api/users/1", { method: "DELETE" });
//     if (res.ok) toast.success("User deleted!");
//     else toast.error("Failed to delete user.");
//   };
//
//   return (
//     <div>
//       <Button label="Delete" variant="danger" onClick={handleDelete} />
//       <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
//     </div>
//   );
// }