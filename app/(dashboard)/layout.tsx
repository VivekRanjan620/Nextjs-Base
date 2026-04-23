// app/(dashboard)/layout.tsx
// This layout wraps all user dashboard pages
// Sidebar and Header are written ONCE here
// Every page inside (dashboard)/ folder automatically gets them
// No need to repeat Sidebar and Header in every page!

import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

// In real app, you will get user data from session/cookie
// For now we are using dummy data to keep it simple
const currentUser = {
  name: "John Doe",
  role: "user" as const,
};

export default function DashboardLayout({
  children, // children = the actual page content (dashboard/page.tsx etc.)
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-950">

      {/* Sidebar — fixed on the left side */}
      <Sidebar role={currentUser.role} userName={currentUser.name} />

      {/* Right side — Header on top, page content below */}
      <div className="flex-1 flex flex-col">

        {/* Header — shows page title and user info */}
        {/* title will be set per page later using Next.js metadata — for now static */}
        <Header
          title="User Dashboard"
          userName={currentUser.name}
          notificationCount={2}
        />

        {/* Page content — this is where dashboard/page.tsx renders */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}