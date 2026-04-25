"use client";

import { useEffect, useState } from "react";
import StatCard from "@/app/components/dashboard/StatCard";
import DataTable, { Column } from "@/app/components/dashboard/DataTable";
import Badge from "@/app/components/ui/Badge";
import Avatar from "@/app/components/ui/Avatar";
import Loader from "@/app/components/ui/Loader";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

// Table columns — same as before
const userColumns: Column<User>[] = [
  {
    key: "name",
    label: "User",
    render: (value) => <Avatar name={value} showName />,
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
      <Badge label={value} variant={value === "admin" ? "info" : "neutral"} />
    ),
  },
  {
    key: "created_at",
    label: "Joined",
    render: (value) => (
      <span className="text-gray-500 text-xs">
        {new Date(value).toLocaleDateString()} {/* Date format karo */}
      </span>
    ),
  },
];

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all users from admin API
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.users);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader fullScreen text="Loading admin panel..." />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white text-2xl font-bold">Admin Overview ⚡</h2>
        <p className="text-gray-400 text-sm mt-1">
          Total users registered: {users.length}
        </p>
      </div>

      {/* Stats — real data from API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          icon="👥"
        />
        <StatCard
          title="Admins"
          value={users.filter((u) => u.role === "admin").length}
          icon="⚡"
        />
        <StatCard
          title="Regular Users"
          value={users.filter((u) => u.role === "user").length}
          icon="👤"
        />
      </div>

      {/* Real users table */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-3">All Users</h3>
        <DataTable
          columns={userColumns}
          data={users}
          emptyMessage="No users registered yet."
        />
      </div>
    </div>
  );
}