// Reusable blog card — used in BlogSection and /blog page
// Image on top, title at bottom with red text

interface BlogCardProps {
  image: string;       // Blog thumbnail image
  title: string;       // Blog post title
  href: string;        // Link to full blog post
}

export default function BlogCard({ image, title, href }: BlogCardProps) {
  return (
    <a
      href={href}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      {/* Blog thumbnail image */}
      <div className="w-full h-[180px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Blog title — red color like TenderCuts */}
      <div className="p-4">
        <p className="text-red-500 font-semibold text-sm leading-snug line-clamp-2">
          {title}
        </p>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
// <BlogCard
//   image="/blogs/blog1.webp"
//   title="Seafood, Chicken, or Mutton? A Complete Guide..."
//   href="/blog/seafood-chicken-mutton"
// />