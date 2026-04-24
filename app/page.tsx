// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="flex flex-col items-center justify-center h-full py-20 text-center">
//       <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MyApp 👋</h1>
//       <p className="text-gray-500 mb-8">Create account and enjoy!</p>
//       <div className="flex gap-4">
//         <Link href="/login" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50">Login</Link>
//         <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Register</Link>
//       </div>
//     </div>
//   );
// }

// import Link from "next/link";
// import Card from "@/app/components/ui/Card";
// import Button from "@/app/components/ui/Button";

// export default function HomePage() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
//       <Card className="bg-blue-100 border-blue-800"
//         title="Welcome to MyApp 👋"
//         subtitle="Create account and enjoy!"

//          titleClassName="text-green"
//         subtitleClassName="text-yellow-300"
//         footer={
//           <div className="flex gap-3">
//             <Link href="/login">
//               <Button label="Login" variant="outline" />
//             </Link>

//             <Link href="/register">
//               <Button label="Register" variant="primary" />
//             </Link>
//           </div>
//         }
//       >
//         <p className="text-green-900">
//           This is reusable card component demo.
//         </p>
//       </Card>

//     </div>
//   );
// }

// app/page.tsx
// Homepage — clean dark theme, matches dashboard design
// Uses our reusable Card component for feature cards
// Simple enough to understand, good enough to show in portfolio!

import Link from "next/link";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";

// Feature cards data — easy to add/remove cards from here
// No need to touch JSX, just update this array
const features = [
  {
    icon: "🔐",
    title: "Secure Authentication",
    description:
      "Login and register with bcrypt password hashing and JWT tokens stored in secure HTTP-only cookies.",
  },
  {
    icon: "👤",
    title: "User Dashboard",
    description:
      "Every user gets a personal dashboard to track their activity, orders, and profile information.",
  },
  {
    icon: "⚡",
    title: "Admin Panel",
    description:
      "Admins get full control — manage users, view reports, and monitor platform activity in real time.",
  },
  {
    icon: "🛡️",
    title: "Role Based Access",
    description:
      "Routes are protected by middleware. Users and admins only see what they are allowed to access.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24">

        {/* Small tag above heading */}
        <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4">
          Built with Next.js + MySQL
        </span>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Welcome to{" "}
          <span className="text-blue-500">MyApp</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          A full-stack web application with secure login, role-based dashboards,
          and a clean admin panel — ready to scale.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/register">
            <Button label="Get Started" variant="primary" size="lg" />
          </Link>
          <Link href="/login">
            <Button label="Login" variant="outline" size="lg" />
          </Link>
        </div>

      </section>

      {/* ── Features Section ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">

        {/* Section heading */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          What's Inside?
        </h2>
        <p className="text-center text-gray-500 text-sm mb-10">
          Everything you need to build on top of this foundation.
        </p>

        {/* Feature cards grid — 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            // Reusing our Card component — just passing different data each time
            <Card
              key={feature.title}
              className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                {/* Icon */}
                <span className="text-3xl">{feature.icon}</span>

                {/* Card title */}
                <h3 className="text-white font-semibold text-lg">
                  {feature.title}
                </h3>

                {/* Card description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

      </section>

      {/* ── Bottom CTA Section ── */}
      <section className="border-t border-gray-800 py-16 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-3">
          Ready to get started?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Create your account in seconds — no credit card required.
        </p>
        <Link href="/register">
          <Button label="Create Free Account" variant="primary" size="lg" />
        </Link>
      </section>

    </div>
  );
}