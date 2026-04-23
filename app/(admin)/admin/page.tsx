// app/(admin)/admin/page.tsx
// Main admin dashboard page — /admin
// Sidebar and Header come from layout.tsx automatically
// This page only focuses on its own content

import StatCard from "@/app/components/dashboard/StatCard";
import DataTable, { Column } from "@/app/components/dashboard/DataTable";
import Badge from "@/app/components/ui/Badge";
import Avatar from "@/app/components/ui/Avatar";

// -------------------------------------------
// Define the shape of a user object
// Admin sees all users — so we need more fields than user dashboard
// -------------------------------------------
interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  joinedAt: string;
}

// -------------------------------------------
// Dummy users data — replace with real DB fetch later
// In real app: fetch from /api/admin/users
// -------------------------------------------
const allUsers: User[] = [
  { id: 1, name: "John Doe",    email: "john@example.com",  role: "user",  status: "active",   joinedAt: "2025-01-10" },
  { id: 2, name: "Jane Smith",  email: "jane@example.com",  role: "user",  status: "inactive", joinedAt: "2025-02-14" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com",   role: "admin", status: "active",   joinedAt: "2025-03-01" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "user",  status: "active",   joinedAt: "2025-04-05" },
];

// -------------------------------------------
// Column definitions for the users table
// Admin sees: Avatar+Name, Email, Role, Status, Joined date
// Notice how "name" column uses Avatar component inside render
// This is the power of the "render" prop in DataTable!
// -------------------------------------------
const userColumns: Column<User>[] = [
  {
    key: "name",
    label: "User",
    // Custom render — show Avatar alongside name
    render: (value, row) => (
      <Avatar name={value} showName />
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (value) => <span className="text-gray-400">{value}</span>,
  },
  {
    key: "role",
    label: "Role",
    render: (value) => (
      <Badge
        label={value}
        variant={value === "admin" ? "info" : "neutral"}
      />
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge
        label={value}
        variant={value === "active" ? "success" : "danger"}
        dot
      />
    ),
  },
  {
    key: "joinedAt",
    label: "Joined",
    render: (value) => <span className="text-gray-500 text-xs">{value}</span>,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Page heading */}
      <div>
        <h2 className="text-white text-2xl font-bold">Admin Overview ⚡</h2>
        <p className="text-gray-400 text-sm mt-1">Monitor and manage your entire platform.</p>
      </div>

      {/* -------------------------------------------
          Stat Cards — Admin sees platform-wide stats
          Same StatCard component as user dashboard
          Only the data (props) is different!
      ------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={120}
          icon="👥"
          change="+8 this week"
          changeType="positive"
        />
        <StatCard
          title="Active Users"
          value={98}
          icon="✅"
          change="82% of total"
          changeType="positive"
        />
        <StatCard
          title="Total Orders"
          value={340}
          icon="📦"
          change="+24 today"
          changeType="positive"
        />
        <StatCard
          title="Revenue"
          value="$4,200"
          icon="💰"
          change="+12% this month"
          changeType="positive"
        />
      </div>

      {/* -------------------------------------------
          Users Table — Admin sees ALL users
          Same DataTable component as user dashboard
          Only columns and data are different
          
          User dashboard:  DataTable showing MY orders
          Admin dashboard: DataTable showing ALL users
          
          One component — infinite use cases!
      ------------------------------------------- */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-3">All Users</h3>
        <DataTable
          columns={userColumns}
          data={allUsers}
          emptyMessage="No users registered yet."
        />
      </div>

    </div>
  );
}