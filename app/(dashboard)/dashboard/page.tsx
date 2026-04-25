"use client";

import { useEffect, useState } from "react";
import StatCard from "@/app/components/dashboard/StatCard";
import Loader from "@/app/components/ui/Loader";

// Shape of user data from API
interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserDashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch real user data from API
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
        setIsLoading(false);
      });
  }, []); // [] = sirf ek baar run hoga — page load pe

  // Show loader while data is coming
  if (isLoading) return <Loader fullScreen text="Loading dashboard..." />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white text-2xl font-bold">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {user?.email}
        </p>
      </div>

      {/* Stats — abhi static hain, baad mein orders table bane toh real honge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders"  value={0}  icon="🛒" />
        <StatCard title="Delivered"     value={0}  icon="✅" />
        <StatCard title="Pending"       value={0}  icon="⏳" />
        <StatCard title="Cancelled"     value={0}  icon="❌" />
      </div>
    </div>
  );
}