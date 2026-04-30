"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  sub: string;
  weight: string;
  original_price: number;
  sale_price: number;
  starts_from: number;
  tag: string;
  discount: number;
  customisable: boolean;
  image_url: string;
  is_active: boolean;
}

const emptyForm = {
  name: "", category: "chicken", sub: "", weight: "",
  original_price: "", sale_price: "", starts_from: "",
  tag: "Antibiotic Free", discount: "", customisable: false, image_url: "", is_active: true
};

const categories = ["chicken", "mutton", "seafood", "biryani", "snacks", "combo", "eggs", "pickles", "spices"];

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Products fetch karo
  const fetchProducts = () => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Admin check
    fetch("/api/auth/me").then((res) => res.json()).then((data) => {
      if (!data.loggedIn || data.user.role !== "admin") router.push("/");
      else fetchProducts();
    });
  }, []);

  // Add button click
  const handleAdd = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setMessage("");
    setShowModal(true);
  };

  // Edit button click
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      sub: product.sub || "",
      weight: product.weight || "",
      original_price: product.original_price || "",
      sale_price: product.sale_price || "",
      starts_from: product.starts_from || "",
      tag: product.tag || "",
      discount: product.discount || "",
      customisable: product.customisable,
      image_url: product.image_url || "",
      is_active: product.is_active,
    });
    setMessage("");
    setShowModal(true);
  };

  // Delete button click
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Form submit — Add ya Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = editProduct
      ? `/api/admin/products/${editProduct.id}`
      : "/api/admin/products";

    const method = editProduct ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (data.success) {
      setShowModal(false);
      fetchProducts();
    } else {
      setMessage(data.message);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Products</h1>
          <p className="text-gray-400 text-sm mt-1">Total: {products.length} products</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-xs px-4 py-3">Image</th>
              <th className="text-left text-gray-400 text-xs px-4 py-3">Name</th>
              <th className="text-left text-gray-400 text-xs px-4 py-3">Category</th>
              <th className="text-left text-gray-400 text-xs px-4 py-3">Price</th>
              <th className="text-left text-gray-400 text-xs px-4 py-3">Status</th>
              <th className="text-left text-gray-400 text-xs px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-12 text-sm">
                  No products yet. Click "+ Add Product" to start.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  {/* Image */}
                  <td className="px-4 py-3">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-700" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                        No img
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium">{product.name}</p>
                    <p className="text-gray-500 text-xs">{product.sub}</p>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3">
                    {product.starts_from ? (
                      <p className="text-white text-sm">Starts ₹{product.starts_from}</p>
                    ) : (
                      <div>
                        <p className="text-white text-sm font-semibold">₹{product.sale_price}</p>
                        {product.original_price && (
                          <p className="text-gray-500 text-xs line-through">₹{product.original_price}</p>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.is_active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {product.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(product)}
                        className="text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 border border-blue-400/30 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 text-xs px-3 py-1.5 border border-red-400/30 rounded-lg transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h2 className="text-white font-bold text-lg">
                {editProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-xl">
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">

              {/* Name */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Product Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Chicken Curry Cut"
                  required
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sub */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Sub text</label>
                <input
                  value={form.sub}
                  onChange={(e) => setForm({ ...form, sub: e.target.value })}
                  placeholder="e.g. Customise your product"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Weight</label>
                <input
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  placeholder="e.g. 480 - 500 Gms"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Prices — 3 in a row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Original Price</label>
                  <input
                    type="number"
                    value={form.original_price}
                    onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    placeholder="₹"
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Sale Price</label>
                  <input
                    type="number"
                    value={form.sale_price}
                    onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
                    placeholder="₹"
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Starts From</label>
                  <input
                    type="number"
                    value={form.starts_from}
                    onChange={(e) => setForm({ ...form, starts_from: e.target.value })}
                    placeholder="₹"
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Tag + Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Tag</label>
                  <input
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    placeholder="e.g. Antibiotic Free"
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Discount %</label>
                  <input
                    type="number"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    placeholder="e.g. 17"
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Image Path</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="e.g. /products/chicken-liver.webp"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Customisable + Active — checkboxes */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.customisable}
                    onChange={(e) => setForm({ ...form, customisable: e.target.checked })}
                    className="w-4 h-4 accent-red-500"
                  />
                  <span className="text-gray-300 text-sm">Customisable</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="w-4 h-4 accent-red-500"
                  />
                  <span className="text-gray-300 text-sm">Active</span>
                </label>
              </div>

              {/* Error message */}
              {message && <p className="text-red-400 text-sm">{message}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {saving ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}