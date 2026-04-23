// Card.tsx — Reusable card container component
// Used to wrap any content inside a styled box (white background, shadow, rounded corners)
// Instead of repeating the same div styling everywhere, we use this component

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;            // Any content inside the card
  title?: string;                 // Optional heading at the top
  subtitle?: string;              // Optional smaller text below title
  footer?: ReactNode;             // Optional content at the bottom (e.g. buttons)
  padding?: "sm" | "md" | "lg";  // Control inner spacing
  className?: string;             // Card background, border color etc.
  titleClassName?: string;        // Title text color — child decides this
  subtitleClassName?: string;     // Subtitle text color — child decides this
}

export default function Card({
  children,
  title,
  subtitle,
  footer,
  padding = "md",
  className = "",
  titleClassName = "text-gray-800",      // Default — dark gray (light theme)
  subtitleClassName = "text-gray-500",   // Default — medium gray
}: CardProps) {

  // Padding sizes for the card body
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div className={`rounded-lg shadow-md border ${className}`}>

      {/* Card Header — only renders if title or subtitle is passed */}
      {(title || subtitle) && (
        <div className="px-6 pt-6 pb-2">
          {/* Title — color comes from titleClassName prop */}
          {title && (
            <h3 className={`text-lg font-semibold ${titleClassName}`}>
              {title}
            </h3>
          )}
          {/* Subtitle — color comes from subtitleClassName prop */}
          {subtitle && (
            <p className={`text-sm mt-1 ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Body — main content */}
      <div className={paddings[padding]}>
        {children}
      </div>

      {/* Card Footer — only renders if footer is passed */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Simple card:
// <Card>
//   <p>Some content here</p>
// </Card>
//
// Card with title:
// <Card title="User Details" subtitle="Basic profile information">
//   <p>Name: John Doe</p>
// </Card>
//
// Card with footer buttons:
// <Card
//   title="Delete Account"
//   footer={<Button label="Confirm Delete" variant="danger" />}
// >
//   <p>This action cannot be undone.</p>
// </Card>
//
// Dashboard stat card (no title prop, custom children):
// <Card padding="sm">
//   <p className="text-2xl font-bold">120</p>
//   <p className="text-gray-500">Total Users</p>
// </Card>