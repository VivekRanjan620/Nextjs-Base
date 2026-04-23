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

import Link from "next/link";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <Card className="bg-blue-100 border-blue-800"
        title="Welcome to MyApp 👋"
        subtitle="Create account and enjoy!"

         titleClassName="text-green"
        subtitleClassName="text-yellow-300"
        footer={
          <div className="flex gap-3">
            <Link href="/login">
              <Button label="Login" variant="outline" />
            </Link>

            <Link href="/register">
              <Button label="Register" variant="primary" />
            </Link>
          </div>
        }
      >
        <p className="text-green-900">
          This is reusable card component demo.
        </p>
      </Card>

    </div>
  );
}

