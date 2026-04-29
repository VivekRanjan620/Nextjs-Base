// Cart ko localStorage mein store karte hain
// Pure functions — koi React nahi, kahin bhi import karo

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  quantity: number;
}

const CART_KEY = "tc_cart"; // localStorage key

// Sab items nikalo
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

// Cart save karo
function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Item add karo — already hai toh quantity badhao
export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  // Custom event — Navbar aur CartBar ko batao cart update hua
  window.dispatchEvent(new Event("cartUpdated"));
}

// Quantity update karo
export function updateQuantity(id: number, quantity: number) {
  const cart = getCart();
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
  }
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}

// Item remove karo
export function removeFromCart(id: number) {
  const cart = getCart().filter((c) => c.id !== id);
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}

// Total items count
export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// Total price
export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Cart clear karo
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}