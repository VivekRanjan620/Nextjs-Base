// components/ui/Input.tsx
// Reusable input field component
// Handles label, placeholder, error message, and all input types
// Used in: LoginForm, RegisterForm, ProfileForm, any future form

interface InputProps {
  label: string;                  // Label text above the input
  name: string;                   // Input field name (for forms)
  type?: string;                  // "text" | "email" | "password" | "number" etc.
  placeholder?: string;           // Placeholder inside input
  value: string;                  // Controlled value from parent state
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  error?: string;                 // Error message shown below input (optional)
  disabled?: boolean;             // Disable the input
  required?: boolean;             // Mark field as required
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">

      {/* Label */}
      <label htmlFor={name} className="text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Input field */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-lg text-sm
          bg-gray-800 text-white placeholder-gray-500
          border transition-all outline-none
          focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-red-500 focus:ring-red-500"   // Red border if error
            : "border-gray-700 hover:border-gray-600" // Normal border
          }
        `}
      />

      {/* Error message — only shows if error prop is passed */}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Basic usage:
// <Input
//   label="Email"
//   name="email"
//   type="email"
//   placeholder="you@example.com"
//   value={form.email}
//   onChange={(e) => setForm({ ...form, email: e.target.value })}
// />
//
// With error:
// <Input
//   label="Password"
//   name="password"
//   type="password"
//   value={form.password}
//   onChange={(e) => setForm({ ...form, password: e.target.value })}
//   error="Password must be at least 8 characters"
// />
//
// Required field:
// <Input label="Name" name="name" value={form.name} onChange={...} required />