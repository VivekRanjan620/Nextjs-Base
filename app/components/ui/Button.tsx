// Button.tsx — Reusable button component
// Instead of creating separate buttons for login, logout, delete, save etc.
// we use one component and pass props to control its appearance and behavior

interface ButtonProps {
  label: string;                  // Text displayed on the button
  onClick?: () => void;           // Function to call when button is clicked (optional)
  type?: "button" | "submit" | "reset"; // HTML button type (default: "button")
  variant?: "primary" | "danger" | "outline" | "ghost"; // Visual style
  size?: "sm" | "md" | "lg";     // Button size
  disabled?: boolean;             // Disable the button
  fullWidth?: boolean;            // Take full width of parent
  isLoading?: boolean;            // Show loading state
}

export default function Button({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  isLoading = false,
}: ButtonProps) {

  // Base classes applied to every button
  const base = "font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  // Variant styles — controls color
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    danger:  "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost:   "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
  };

  // Size styles — controls padding and font size
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {/* Show loading spinner or label */}
      {isLoading ? "Loading..." : label}
    </button>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Login button:
// <Button label="Login" type="submit" variant="primary" fullWidth />
//
// Logout button:
// <Button label="Logout" onClick={handleLogout} variant="outline" />
//
// Delete button:
// <Button label="Delete" onClick={handleDelete} variant="danger" size="sm" />
//
// Save button (loading state):
// <Button label="Save Changes" type="submit" isLoading={isSaving} />
//
// Disabled button:
// <Button label="Submit" disabled={true} />