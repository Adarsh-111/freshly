import { ShoppingCart, PackageX } from "lucide-react";

export default function ProductCard({ product, onAdd, inCartQty }) {
  const { name, category, price, unit, inStock } = product;

  const categoryEmoji = {
    Vegetables: "🥦",
    Fruits: "🍎",
    Dairy: "🥛",
    Herbs: "🌿",
  }[category] ?? "🛒";

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""} ${inCartQty > 0 ? "in-cart" : ""}`}>
      <div className="card-emoji">{categoryEmoji}</div>

      <div className="card-body">
        <span className="card-category">{category}</span>
        <h3 className="card-name">{name}</h3>
        <span className="card-unit">{unit}</span>
      </div>

      <div className="card-footer">
        <span className="card-price">₹{price}</span>

        {!inStock ? (
          <button className="btn-unavailable" disabled>
            <PackageX size={14} />
            Out of Stock
          </button>
        ) : (
          <button
            className="btn-add"
            onClick={() => onAdd(product)}
          >
            <ShoppingCart size={14} />
            {inCartQty > 0 ? `Add More (${inCartQty})` : "Add"}
          </button>
        )}
      </div>
    </div>
  );
}
