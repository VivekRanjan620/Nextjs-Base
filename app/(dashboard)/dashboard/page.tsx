// app/(dashboard)/dashboard/page.tsx
// This is the main user dashboard page — /dashboard
// Notice: No Sidebar, No Header written here
// They come automatically from layout.tsx above!

// We are only importing our reusable components and using them with data
import StatCard from "@/app/components/dashboard/StatCard";
import DataTable, { Column } from "@/app/components/dashboard/DataTable";
import Badge from "@/app/components/ui/Badge";
import Card from "@/app/components/ui/Card";


// -------------------------------------------
// Define the shape of an order object
// This tells TypeScript what fields each order has
// -------------------------------------------
interface Order {
  id: number;
  product: string;
  date: string;
  amount: string;
  status: "delivered" | "pending" | "cancelled";
}

// -------------------------------------------
// Dummy order data — replace with real DB data later
// In real app: fetch this from /api/orders
// -------------------------------------------
const myOrders: Order[] = [
  { id: 1, product: "Wireless Headphones", date: "2025-04-10", amount: "$59.99", status: "delivered" },
  { id: 2, product: "Mechanical Keyboard", date: "2025-04-15", amount: "$89.99", status: "pending" },
  { id: 3, product: "USB-C Hub", date: "2025-04-18", amount: "$34.99", status: "cancelled" },
  { id: 4, product: "Monitor Stand", date: "2025-04-20", amount: "$44.99", status: "delivered" },
];

// -------------------------------------------
// Column definitions for DataTable
// "key" maps to the field name in Order interface
// "render" lets us show custom UI instead of plain text
// -------------------------------------------
const orderColumns: Column<Order>[] = [
  {
    key: "id",
    label: "Order ID",
    render: (value) => <span className="text-gray-500">#{value}</span>,
  },
  {
    key: "product",
    label: "Product",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "amount",
    label: "Amount",
    render: (value) => <span className="text-green-400 font-medium">{value}</span>,
  },
  {
    key: "status",
    label: "Status",
    // Custom render — show Badge instead of plain text
    render: (value) => (
      <Badge
        label={value}
        variant={
          value === "delivered" ? "success" :
          value === "pending"   ? "warning" :
          "danger"  // cancelled
        }
        dot
      />
    ),
  },
];

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Welcome message */}
      <div>
        <h2 className="text-white text-2xl font-bold">Welcome back, John! 👋</h2>
        <p className="text-gray-400 text-sm mt-1">Here is a summary of your account.</p>
      </div>

      {/* -------------------------------------------
          Stat Cards Section
          StatCard is reusable — just pass different props
          Same component shows different data for each card
      ------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={4}
          icon="🛒"
          change="2 this month"
          changeType="positive"
        />
        <StatCard
          title="Delivered"
          value={2}
          icon="✅"
          change="on time"
          changeType="positive"
        />
        <StatCard
          title="Pending"
          value={1}
          icon="⏳"
          change="in progress"
          changeType="neutral"
        />
        <StatCard
          title="Cancelled"
          value={1}
          icon="❌"
          change="1 this month"
          changeType="negative"
        />
      </div>

      {/* -------------------------------------------
          Orders Table Section
          Card wraps the DataTable for consistent styling
          DataTable receives columns + data as props
      ------------------------------------------- */}
      <Card
        title="My Recent Orders"
        subtitle="All your orders in one place"
        padding="sm"
        className="bg-transparent border-0 shadow-none"
      >
        {/* 
          DataTable is fully reusable:
          - columns: what to show and how
          - data: the actual rows
          - emptyMessage: shown if no orders exist
        */}
        <DataTable
          columns={orderColumns}
          data={myOrders}
          emptyMessage="You have no orders yet."
        />
      </Card>

    </div>
  );
}