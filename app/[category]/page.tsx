"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { addToCart, getCart, updateQuantity } from "@/app/lib/cartStore";
import CartBar from "@/app/components/ui/CartBar";
import CartDrawer from "@/app/components/ui/CartDrawer";
import LoginDrawer from "@/app/components/ui/LoginDrawer";


const categoryTabs = [
  { label: "Chicken",       href: "/chicken",       image: "/Category/wallpaper/chicken.png" },
  { label: "Mutton",        href: "/mutton",        image: "/Category/wallpaper/mutton.png" },
  { label: "Sea Food",      href: "/seafood",       image: "/Category/wallpaper/seafood.png" },
  { label: "Ready To Cook", href: "/ready-to-cook", image: "/Category/wallpaper/readycook.png" },
  { label: "Biryani",       href: "/biryani",       image: "/Category/wallpaper/biryani.png" },
  { label: "Snacks",        href: "/snacks",        image: "/Category/wallpaper/snacks.png" },
  { label: "Pre book",      href: "/prebook",       image: "/Category/wallpaper/prebook.png" },
  { label: "Elite offers",  href: "/elite-offers",  image: "/Category/wallpaper/elite.png" },
  { label: "Cold cuts",     href: "/cold-cuts",     image: "/Category/wallpaper/coldcuts.png" },
  { label: "Eggs",          href: "/eggs",          image: "/Category/wallpaper/eggs.png" },
  { label: "Pickles",       href: "/pickles",       image: "/Category/wallpaper/pickles.png" },
  { label: "Spices",        href: "/spices",        image: "/Category/wallpaper/spices.png" },
  { label: "Dry fish",      href: "/dry-fish",      image: "/Category/wallpaper/dryfish.png" },
];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // ✅ DB se products aayenge — empty array se start
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<Record<number, number>>({});
  const isLoggedInRef = useRef(false);

  // ✅ DB se products fetch karo
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`/api/products?category=${category}`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error("Products fetch failed", err);
    }
    setLoadingProducts(false);
  };

  const checkAuth = () => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        isLoggedInRef.current = !!d.loggedIn;
        setIsLoggedIn(!!d.loggedIn);
      });
  };

  const refreshCartItems = () => {
    const cart = getCart();
    const map: Record<number, number> = {};
    cart.forEach((item) => { map[item.id] = item.quantity; });
    setCartItems(map);
  };

  useEffect(() => {
    fetchProducts();  // ✅ Page load pe products fetch karo
    checkAuth();
    refreshCartItems();
    window.addEventListener("cartUpdated", refreshCartItems);
    window.addEventListener("authChanged", checkAuth);
    return () => {
      window.removeEventListener("cartUpdated", refreshCartItems);
      window.removeEventListener("authChanged", checkAuth);
    };
  }, [category]); // ✅ category change hone pe dobara fetch karo

  const handleAdd = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      // ✅ DB columns — snake_case
      price: product.sale_price || product.starts_from,
      originalPrice: product.original_price || product.starts_from,
      weight: product.weight || "",
      image: product.image_url,
    });
  };

  const handleCartClick = () => {
    if (!isLoggedInRef.current) {
      setLoginDrawerOpen(true);
    } else {
      setCartDrawerOpen(true);
    }
  };

  const categoryTitle = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="bg-gray-50 min-h-screen pb-40 md:pb-0">

      {/* Category Tabs — same */}
      <div className="bg-gradient-to-r from-[#ffe0e4] via-[#ffeff1] to-[#fff5f6] border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            <button className="hidden md:flex w-8 h-8 flex-shrink-0 items-center justify-center text-gray-500 hover:text-red-500">‹</button>
            {categoryTabs.map((tab) => {
              const isActive = tab.href === `/${category}`;
              return (
                <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1.5 flex-shrink-0 px-4 py-1 group">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all ${isActive ? "border-red-500" : "border-transparent"}`}>
                    <img src={tab.image} alt={tab.label} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? "text-red-500" : "text-gray-600"}`}>{tab.label}</span>
                  {isActive && <div className="w-full h-0.5 bg-red-500 rounded-full" />}
                </Link>
              );
            })}
            <button className="hidden md:flex w-8 h-8 flex-shrink-0 items-center justify-center text-gray-500 hover:text-red-500">›</button>
          </div>
        </div>
      </div>

      {/* Breadcrumb — same */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-red-500 font-medium">{categoryTitle}</span>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4">

        {/* Loading state */}
        {loadingProducts ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>

        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found.</p>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative w-full h-[200px] md:h-[220px] bg-gray-100">
                  {/* ✅ image_url — DB column name */}
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {product.discount}% Off
                    </span>
                  )}
                  {product.tag && (
                    <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-base leading-snug">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{product.sub}</p>
                  {product.weight && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-gray-400 text-xs">🕐</span>
                      <p className="text-gray-500 text-xs">{product.weight}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      {/* ✅ starts_from — DB column name */}
                      {product.starts_from && (
                        <p className="text-gray-900 font-bold text-sm">Starts from ₹{product.starts_from}</p>
                      )}
                      {product.original_price && !product.starts_from && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs line-through">₹{product.original_price}</span>
                          <span className="text-gray-900 font-bold text-base">₹{product.sale_price}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end">
                      {cartItems[product.id] ? (
                        <div className="flex items-center border-2 border-red-500 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, cartItems[product.id] - 1)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 font-bold text-lg"
                          >−</button>
                          <span className="w-8 text-center text-sm font-bold">{cartItems[product.id]}</span>
                          <button
                            onClick={() => handleAdd(product)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 font-bold text-lg"
                          >+</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(product)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm"
                        >Add</button>
                      )}
                      {product.customisable && (
                        <span className="text-gray-400 text-[10px] mt-0.5">customisable</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CartBar, CartDrawer, LoginDrawer — same */}
      <CartBar onCartClick={handleCartClick} />
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onLoginRequired={() => {
          setCartDrawerOpen(false);
          setLoginDrawerOpen(true);
        }}
        isLoggedIn={isLoggedIn}
      />
      <LoginDrawer
        isOpen={loginDrawerOpen}
        onClose={() => setLoginDrawerOpen(false)}
        onLoginSuccess={() => {
          window.dispatchEvent(new Event("authChanged"));
          isLoggedInRef.current = true;
          setIsLoggedIn(true);
          setLoginDrawerOpen(false);
          setCartDrawerOpen(true);
        }}
      />
    </div>
  );
}