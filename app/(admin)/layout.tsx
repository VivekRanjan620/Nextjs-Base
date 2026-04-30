// app/(admin)/layout.tsx
// This layout wraps all admin pages
// Completely separate from user dashboard layout
// Admin gets different Sidebar links and Header title
// This is why we used route groups — (dashboard) and (admin) are isolated!

"use client";

import { useState } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

const currentAdmin = {
  name: "Super Admin",
  role: "admin" as const,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950 fixed inset-0 z-[100] overflow-auto">

      <Sidebar
        role={currentAdmin.role}
        userName={currentAdmin.name}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Admin Panel"
          userName={currentAdmin.name}
          notificationCount={5}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  );
}