// components/home/BlogSection.tsx
// Mobile: 1 column, Desktop: 3 columns

import BlogCard from "@/app/components/home/BlogCard";

const blogs = [
  { id: 1, image: "/home-blog/home-blog1.webp", title: "Seafood, Chicken, or Mutton? A Complete Guide to the Best Non-Veg Combos from Tender Cuts in Chennai", href: "/blog/seafood-chicken-mutton" },
  { id: 2, image: "/home-blog/home-blog2.webp", title: "Online Seafood Delivery vs Local Fish Market: Which is Better for Buying Vanjaram Fish?", href: "/blog/online-vs-local-fish-market" },
  { id: 3, image: "/home-blog/home-blog3.webp", title: "Budget-Friendly Ramadan Meal Planning with Chicken & Mutton Combo Packs", href: "/blog/ramadan-meal-planning" },
];

export default function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-gray-900 font-bold text-lg md:text-xl">Our Blog</h2>
        <a href="/blog" className="flex items-center gap-1 text-xs md:text-sm text-gray-500 bg-red-50 hover:bg-red-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors font-medium">
          KNOW MORE <span>→</span>
        </a>
      </div>

      {/* Mobile: 1 col, Tablet: 2 col, Desktop: 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} image={blog.image} title={blog.title} href={blog.href} />
        ))}
      </div>
    </section>
  );
}