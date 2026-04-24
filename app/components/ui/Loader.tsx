// Loader.tsx — Reusable loading spinner component
// Used when: API call is in progress, page data is loading
// Can be used inline (small spinner) or fullscreen (page loading)

interface LoaderProps {
  size?: "sm" | "md" | "lg";   // Spinner size
  fullScreen?: boolean;         // Cover entire screen (page loading)
  text?: string;                // Optional text below spinner
}

export default function Loader({
  size = "md",
  fullScreen = false,
  text,
}: LoaderProps) {

  // Spinner circle sizes
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4",
  };

  // The spinner element
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-gray-700          
          border-t-blue-500        
          animate-spin             
        `}
      />
      {/* Optional loading text */}
      {text && (
        <p className="text-gray-400 text-sm">{text}</p>
      )}
    </div>
  );

  // Fullscreen mode — covers the whole page with dark overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80">
        {spinner}
      </div>
    );
  }

  // Inline mode — just the spinner, fits inside any container
  return spinner;
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Inline — inside a button or section:
// {isLoading && <Loader size="sm" />}
//
// Center of a card/section while data loads:
// {isLoading
//   ? <div className="flex justify-center py-10"><Loader size="md" text="Loading users..." /></div>
//   : <DataTable columns={cols} data={users} />
// }
//
// Fullscreen — while entire page is loading:
// {isLoading && <Loader fullScreen text="Please wait..." />}
//
// Real example in admin page:
// const [isLoading, setIsLoading] = useState(true);
// const [users, setUsers] = useState([]);
//
// useEffect(() => {
//   fetch("/api/admin/users")
//     .then(res => res.json())
//     .then(data => {
//       setUsers(data);
//       setIsLoading(false);
//     });
// }, []);
//
// return isLoading
//   ? <Loader fullScreen text="Loading dashboard..." />
//   : <DataTable columns={userColumns} data={users} />;