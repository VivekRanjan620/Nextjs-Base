"use client";

// Header.tsx — Top bar for dashboard pages
// Shows current page title, user avatar, and notification bell
// Used in both user and admin dashboards — only "title" changes

// import Avatar from "@/components/ui/Avatar";
// import Badge from "@/components/ui/Badge";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";

interface HeaderProps {
  title: string;          // Page title shown on the left e.g. "Overview", "Manage Users"
  userName: string;       // Logged in user's name
  userImage?: string;     // Optional profile picture
  notificationCount?: number; // Number of unread notifications
}

export default function Header({
  title,
  userName,
  userImage,
  notificationCount = 0,
}: HeaderProps) {
  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">

      {/* Left side — Page title */}
      <div>
        <h1 className="text-white font-semibold text-lg">{title}</h1>
      </div>

      {/* Right side — Notifications + User info */}
      <div className="flex items-center gap-4">

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <span className="text-gray-400 hover:text-white text-xl transition-colors">🔔</span>

          {/* Show red dot badge if there are notifications */}
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-700" />

        {/* User avatar with name */}
        <Avatar
          name={userName}
          imageUrl={userImage}
          size="sm"
          showName
        />
      </div>

    </header>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// User dashboard:
// <Header title="Overview" userName={user.name} notificationCount={3} />
//
// Admin dashboard:
// <Header title="Manage Users" userName={admin.name} notificationCount={0} />
//
// With profile image:
// <Header title="Overview" userName={user.name} userImage={user.avatarUrl} />