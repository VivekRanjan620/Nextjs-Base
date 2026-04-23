// Avatar.tsx — Reusable avatar/profile picture component
// Used to display user profile images or initials fallback
// Used in: Navbar, dashboard header, user tables, comments etc.

interface AvatarProps {
  name: string;             // User's name — used to generate initials as fallback
  imageUrl?: string;        // Optional profile picture URL
  size?: "sm" | "md" | "lg" | "xl"; // Avatar size
  showName?: boolean;       // Show the name text next to avatar
}

export default function Avatar({
  name,
  imageUrl,
  size = "md",
  showName = false,
}: AvatarProps) {

  // Size classes for the avatar circle
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  // Generate initials from name — e.g. "John Doe" → "JD"
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Max 2 characters

  return (
    <div className="flex items-center gap-2">

      {/* Avatar circle */}
      <div
        className={`
          ${sizes[size]}
          rounded-full flex items-center justify-center
          font-semibold flex-shrink-0 overflow-hidden
          bg-blue-100 text-blue-600
        `}
      >
        {imageUrl ? (
          // Show image if URL is provided
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          // Show initials if no image
          <span>{initials}</span>
        )}
      </div>

      {/* Optional name text next to avatar */}
      {showName && (
        <span className="text-sm font-medium text-gray-700">{name}</span>
      )}

    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// With initials only (no image):
// <Avatar name="John Doe" />                    → Shows "JD"
// <Avatar name="Alice" />                       → Shows "A"
//
// With profile image:
// <Avatar name="John Doe" imageUrl="/john.jpg" />
//
// With name displayed next to avatar (e.g. Navbar):
// <Avatar name={user.name} showName />
//
// Different sizes:
// <Avatar name="John" size="sm" />   → small (Navbar)
// <Avatar name="John" size="lg" />   → large (Profile page)
// <Avatar name="John" size="xl" />   → extra large (Profile header)
//
// In a user table row:
// <td><Avatar name={user.name} imageUrl={user.avatar} showName /></td>