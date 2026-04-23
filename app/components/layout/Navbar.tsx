import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">Base-NextJS</Link>
      <div className="flex gap-4">
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
      </div>
    </nav>
  );
}