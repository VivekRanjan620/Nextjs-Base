// StatCard.tsx — Reusable statistics card component
// Displays a single metric with title, value, icon, and optional change indicator
// Used in dashboard overview pages for both user and admin

interface StatCardProps {
  title: string;              // Label e.g. "Total Users", "My Orders"
  value: string | number;     // The main number/value to display
  icon: string;               // Emoji or icon string
  change?: string;            // Optional change text e.g. "+12% this week"
  changeType?: "positive" | "negative" | "neutral"; // Controls change text color
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
}: StatCardProps) {

  // Color for the change indicator text
  const changeColors = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral:  "text-gray-500",
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:border-gray-600 transition-all">

      {/* Top row — icon + title */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Main value */}
      <p className="text-white text-3xl font-bold tracking-tight">{value}</p>

      {/* Optional change indicator — e.g. "+12% this week" */}
      {change && (
        <p className={`text-xs font-medium ${changeColors[changeType]}`}>
          {changeType === "positive" && "↑ "}
          {changeType === "negative" && "↓ "}
          {change}
        </p>
      )}

    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Admin dashboard:
// <StatCard title="Total Users" value={120} icon="👥" change="+8 this week" changeType="positive" />
// <StatCard title="Total Orders" value={340} icon="📦" change="-3 today" changeType="negative" />
// <StatCard title="Revenue" value="$4,200" icon="💰" change="+12% this month" changeType="positive" />
//
// User dashboard:
// <StatCard title="My Orders" value={5} icon="🛒" />
// <StatCard title="Pending" value={2} icon="⏳" change="2 awaiting" changeType="neutral" />
//
// Grid layout for multiple stat cards:
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//   <StatCard ... />
//   <StatCard ... />
//   <StatCard ... />
//   <StatCard ... />
// </div>