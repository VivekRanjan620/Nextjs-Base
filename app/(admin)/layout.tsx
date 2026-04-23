// app/(admin)/layout.tsx
// This layout wraps all admin pages
// Completely separate from user dashboard layout
// Admin gets different Sidebar links and Header title
// This is why we used route groups — (dashboard) and (admin) are isolated!

import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

// In real app, get admin data from session/cookie
// For now using dummy data
const currentAdmin = {
  name: "Super Admin",
  role: "admin" as const,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-950">

      {/* 
        Same Sidebar component — but role="admin"
        This makes Sidebar show admin links instead of user links
        One component, two behaviors — this is reusability!
      */}
      <Sidebar role={currentAdmin.role} userName={currentAdmin.name} />

      {/* Right side — Header + page content */}
      <div className="flex-1 flex flex-col">

        <Header
          title="Admin Panel"
          userName={currentAdmin.name}
          notificationCount={5}
        />

        {/* Admin page content renders here */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}