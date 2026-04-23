// DataTable.tsx — Reusable table component
// Accepts dynamic columns and rows via props
// Used in both admin (user list, order list) and user (my orders) dashboards

// Define what a single column looks like
export interface Column<T> {
  key: keyof T;             // Which field from the data object to show
  label: string;            // Column header text
  render?: (value: any, row: T) => React.ReactNode; // Optional custom cell renderer
}

// Generic type T means this table works with any data shape
interface DataTableProps<T> {
  columns: Column<T>[];     // Column definitions
  data: T[];                // Array of data rows
  isLoading?: boolean;      // Show loading skeleton
  emptyMessage?: string;    // Text shown when no data
}

export default function DataTable<T extends { id: number | string }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {

  // Show loading skeleton rows while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* Table header */}
          <thead>
            <tr className="border-b border-gray-700">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left px-5 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {data.length === 0 ? (
              // Empty state — shown when no rows exist
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-5 py-3 text-gray-300">
                      {/* If a custom render function is provided, use it — otherwise show raw value */}
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// 1. Define your data type:
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
// }
//
// 2. Define columns:
// const columns: Column<User>[] = [
//   { key: "name", label: "Name" },
//   { key: "email", label: "Email" },
//   {
//     key: "status",
//     label: "Status",
//     render: (value) => (
//       <Badge
//         label={value}
//         variant={value === "active" ? "success" : "danger"}
//         dot
//       />
//     ),
//   },
// ];
//
// 3. Use in your page:
// <DataTable columns={columns} data={users} isLoading={false} emptyMessage="No users found." />
//
// Admin — user list:
// <DataTable columns={userColumns} data={allUsers} />
//
// User — my orders:
// <DataTable columns={orderColumns} data={myOrders} emptyMessage="You have no orders yet." />