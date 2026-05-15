import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { products, categories } from "./data/products";
import { useCart } from "./hooks/useCart";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";
import "./styles/app.css";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, itemCount, addItem, updateQty, removeItem, clearCart, subtotal } = useCart();

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  function handlePlaceOrder() {
    setOrderPlaced(true);
    clearCart();
    setCartOpen(true);
  }

  function handleAddItem(product) {
    addItem(product);
    setOrderPlaced(false);
  }

  const cartQtyMap = Object.fromEntries(cart.map(i => [i.id, i.qty]));

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-leaf">🌿</span>
            <span className="logo-text">Freshly</span>
          </div>
          <button className="cart-toggle" onClick={() => setCartOpen(o => !o)}>
            <ShoppingCart size={20} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            <span className="cart-label">Cart</span>
          </button>
        </div>
      </header>

      <main className="main">
        {/* Left: Product listing */}
        <section className="products-section">
          <div className="section-header">
            <h1 className="section-title">Fresh Today</h1>
            <p className="section-sub">Delivered to your door in under an hour</p>
          </div>

          {/* Category filters */}
          <div className="filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddItem}
                inCartQty={cartQtyMap[product.id] ?? 0}
              />
            ))}
          </div>
        </section>

        {/* Right: Cart (desktop always visible, mobile toggled) */}
        <aside className={`cart-aside ${cartOpen ? "open" : ""}`}>
          <CartPanel
            cart={cart}
            subtotal={subtotal}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            onPlaceOrder={handlePlaceOrder}
            orderPlaced={orderPlaced}
          />
        </aside>
      </main>

      {/* Mobile cart overlay backdrop */}
      {cartOpen && <div className="backdrop" onClick={() => setCartOpen(false)} />}
    </div>
  );
}
