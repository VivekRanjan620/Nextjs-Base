"use client";

// Dropdown.tsx — Reusable select/filter menu component
// Used for: Filter by role, Filter by status, Select category
// Cleaner and more styleable than native HTML <select>

interface DropdownOption {
  label: string;  // Text shown in the dropdown
  value: string;  // Actual value sent to handler
}

interface DropdownProps {
  label?: string;                         // Label above the dropdown (optional)
  options: DropdownOption[];              // List of options to show
  value: string;                          // Currently selected value
  onChange: (value: string) => void;      // Called when selection changes
  placeholder?: string;                   // Default empty option text
  disabled?: boolean;                     // Disable the dropdown
  className?: string;                     // Extra classes for wrapper
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: DropdownProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>

      {/* Label — only renders if passed */}
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}

      {/* Native select — styled to match dark theme */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-lg text-sm
          bg-gray-800 text-white
          border border-gray-700 hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {/* Placeholder option — empty value */}
        <option value="" disabled>
          {placeholder}
        </option>

        {/* Render each option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Step 1 — Define options:
// const roleOptions = [
//   { label: "All Roles", value: "" },
//   { label: "Admin", value: "admin" },
//   { label: "User", value: "user" },
// ];
//
// Step 2 — State for selected value:
// const [selectedRole, setSelectedRole] = useState("");
//
// Step 3 — Use in JSX:
// <Dropdown
//   label="Filter by Role"
//   options={roleOptions}
//   value={selectedRole}
//   onChange={(val) => setSelectedRole(val)}
//   placeholder="Select role"
// />
//
// Filter status example:
// const statusOptions = [
//   { label: "All", value: "" },
//   { label: "Active", value: "active" },
//   { label: "Inactive", value: "inactive" },
// ];
// <Dropdown options={statusOptions} value={status} onChange={setStatus} />
//
// Use selected value to filter a list:
// const filteredUsers = allUsers.filter(user =>
//   selectedRole === "" ? true : user.role === selectedRole
// );