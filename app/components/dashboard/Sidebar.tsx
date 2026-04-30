"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const userNavItems: NavItem[] = [
  { label: "Overview",   href: "/dashboard",          icon: "📊" },
  { label: "My Profile", href: "/dashboard/profile",  icon: "👤" },
  { label: "Settings",   href: "/dashboard/settings", icon: "⚙️" },
];

const adminNavItems: NavItem[] = [
  { label: "Overview",     href: "/admin",          icon: "📊" },
  { label: "Manage Users", href: "/admin/users",    icon: "👥" },
  { label: "Products",     href: "/admin/products", icon: "🥩" },
  { label: "Reports",      href: "/admin/reports",  icon: "📈" },
  { label: "Settings",     href: "/admin/settings", icon: "⚙️" },
];

interface SidebarProps {
  role: "user" | "admin";
  userName: string;
  mobileOpen: boolean;       // ← Header se aata hai
  onMobileClose: () => void; // ← Drawer band karne ke liye
}

export default function Sidebar({ role, userName, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = role === "admin" ? adminNavItems : userNavItems;

 const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/"; // full page reload hoga
};

  // Sidebar ka actual content — desktop + mobile dono mein same
  const SidebarContent = () => (
    <aside className="w-64 h-full bg-gray-900 flex flex-col border-r border-gray-800">

      {/* Logo + close button (mobile) */}
      <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-wide">
          {role === "admin" ? "⚡ Admin Panel" : "🏠 MyApp"}
        </span>
        {/* Close button — sirf mobile pe */}
        <button
          onClick={onMobileClose}
          className="md:hidden text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info + Logout */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{userName}</p>
            <p className="text-gray-500 text-xs capitalize">{role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-600 hover:text-white transition-all w-full"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );

  return (
    <>
      {/* Desktop — hamesha visible */}
      <div className="hidden md:flex h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile — drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      <div className={`
        fixed top-0 left-0 h-full z-50 md:hidden
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}