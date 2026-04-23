"use client";

// Sidebar.tsx — Reusable sidebar navigation component
// Used in both user and admin dashboards
// The "role" prop controls which links are shown

import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the shape of each navigation item
interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// Links shown to regular users
const userNavItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "My Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

// Links shown to admins — more options than regular users
const adminNavItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Manage Users", href: "/admin/users", icon: "👥" },
  { label: "Reports", href: "/admin/reports", icon: "📈" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

interface SidebarProps {
  role: "user" | "admin"; // Controls which nav items to show
  userName: string;        // Display name at the bottom
}

export default function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname(); // Get current URL to highlight active link
  const navItems = role === "admin" ? adminNavItems : userNavItems;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 flex flex-col border-r border-gray-800">

      {/* Logo / App name at the top */}
      <div className="px-6 py-5 border-b border-gray-800">
        <span className="text-white font-bold text-xl tracking-wide">
          {role === "admin" ? "⚡ Admin Panel" : "🏠 MyApp"}
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          // Check if this link is the current active page
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? "bg-blue-600 text-white"           // Active link style
                  : "text-gray-400 hover:bg-gray-800 hover:text-white" // Inactive link style
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info + logout at the bottom */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          {/* Avatar initials */}
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{userName}</p>
            <p className="text-gray-500 text-xs capitalize">{role}</p>
          </div>
        </div>

        {/* Logout button */}
        <Link
          href="/api/auth/logout"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-600 hover:text-white transition-all w-full"
        >
          <span>🚪</span>
          <span>Logout</span>
        </Link>
      </div>

    </aside>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// User dashboard layout:
// <Sidebar role="user" userName={user.name} />
//
// Admin dashboard layout:
// <Sidebar role="admin" userName={admin.name} />