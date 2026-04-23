// Badge.tsx — Reusable badge/tag component
// Used to display small status labels like: Active, Inactive, Admin, Pending
// Instead of writing styled spans everywhere, we use one component with props

interface BadgeProps {
  label: string;                                           // Text inside the badge
  variant?: "success" | "danger" | "warning" | "info" | "neutral"; // Color style
  size?: "sm" | "md";                                     // Badge size
  dot?: boolean;                                          // Show a colored dot before text
}

export default function Badge({
  label,
  variant = "neutral",
  size = "md",
  dot = false,
}: BadgeProps) {

  // Color styles per variant
  const variants = {
    success: "bg-green-100 text-green-700",
    danger:  "bg-red-100 text-red-600",
    warning: "bg-yellow-100 text-yellow-700",
    info:    "bg-blue-100 text-blue-600",
    neutral: "bg-gray-100 text-gray-600",
  };

  // Dot colors match the variant
  const dotColors = {
    success: "bg-green-500",
    danger:  "bg-red-500",
    warning: "bg-yellow-500",
    info:    "bg-blue-500",
    neutral: "bg-gray-400",
  };

  // Size styles
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
      `}
    >
      {/* Dot indicator — only shows if dot prop is true */}
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {label}
    </span>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// User role badge:
// <Badge label="Admin" variant="info" />
// <Badge label="User" variant="neutral" />
//
// Order status badge:
// <Badge label="Active" variant="success" dot />
// <Badge label="Inactive" variant="danger" dot />
// <Badge label="Pending" variant="warning" dot />
//
// In a table row:
// <td><Badge label={user.status} variant={user.status === "active" ? "success" : "danger"} dot /></td>