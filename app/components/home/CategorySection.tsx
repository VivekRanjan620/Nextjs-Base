import Link from "next/link";

// Category data — image + name + link
// Add/remove categories from here only — JSX don't touch
const categories = [
  { id: 1, name: "Pre book",     image: "/Category/wallpaper/prebook.png",      href: "/prebook" },
  { id: 2, name: "Elite offers", image: "/Category/wallpaper/elite.png",        href: "/elite-offers" },
  { id: 3, name: "Chicken",      image: "/Category/wallpaper/chicken.png",      href: "/chicken" },
  { id: 4, name: "Mutton",       image: "/Category/wallpaper/mutton.png",       href: "/mutton" },
  { id: 5, name: "Sea food",     image: "/Category/wallpaper/seafood.png",      href: "/seafood" },
  { id: 6, name: "Ready to cook", image: "/Category/wallpaper/readycook.png",    href: "/ready-to-cook" },
  { id: 7, name: "Biryani",      image: "/Category/wallpaper/biryani.png",      href: "/biryani" },
  { id: 8, name: "Snacks",       image: "/Category/wallpaper/snacks.png",       href: "/snacks" },
  { id: 9, name: "Combo",        image: "/Category/wallpaper/combo.png",        href: "/combo" },
  { id: 10, name: "Cold cuts",   image: "/Category/wallpaper/coldcuts.png",     href: "/cold-cuts" },
  { id: 11, name: "Eggs",        image: "/Category/wallpaper/eggs.png",         href: "/eggs" },
  { id: 12, name: "Pickles",     image: "/Category/wallpaper/pickles.png",      href: "/pickles" },
  { id: 13, name: "Spices",      image: "/Category/wallpaper/spices.png",       href: "/spices" },
  { id: 14, name: "Dry fish",    image: "/Category/wallpaper/dryfish.png",      href: "/dry-fish" },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* Section heading row */}
      <div className="flex items-center justify-between mb-6">

        {/* Left — heading + subtext */}
        <div>
          <h2 className="text-gray-900 font-bold text-lg md:text-xl">
            Explore by Category
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Farm Fresh Meats and Seafood!
          </p>
        </div>

        {/* Right — Delivery in 90 Minutes badge */}
        <div className="flex items-center gap-2">
          {/* Delivery bike icon */}
          <span className="text-2xl md:text-3xl">🛵</span>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Delivery in</p>
            <p className="text-gray-900 font-black text-base md:text-lg leading-tight">
              90 Minutes
            </p>
          </div>
        </div>
      </div>

      {/* Category grid
          Mobile:  3 columns
          Desktop: 6 columns
      */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="flex flex-col items-center gap-2 group"
          >
            {/* Circle image */}
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 border-2 border-transparent group-hover:border-red-400 transition-all shadow-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Category name */}
            <p className="text-gray-800 text-xs md:text-sm font-medium text-center leading-tight group-hover:text-red-500 transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>

    </section>
  );
}
