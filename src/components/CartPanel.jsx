import { Trash2, Plus, Minus } from "lucide-react";
import { DELIVERY_CHARGE } from "../data/products";

export default function CartPanel({ cart, subtotal, onUpdateQty, onRemove, onPlaceOrder, orderPlaced }) {
  const total = subtotal + DELIVERY_CHARGE;
  const isEmpty = cart.length === 0;

  if (orderPlaced) {
    return (
      <div className="cart-panel">
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Order Placed!</h2>
          <p>Your fresh groceries are on their way. Delivery in 30–45 mins.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <h2 className="panel-title">Your Cart</h2>

      {isEmpty ? (
        <div className="cart-empty">
          <span className="empty-icon">🛒</span>
          <p>Your cart is empty.<br />Add some fresh picks!</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-unit">{item.unit}</span>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>
                    <Minus size={12} />
                  </button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>
                    <Plus size={12} />
                  </button>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
                <span className="cart-item-price">₹{item.price * item.qty}</span>
              </li>
            ))}
          </ul>

          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-rows">
              {cart.map(item => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="summary-row divider">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>₹{DELIVERY_CHARGE}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <button
        className="btn-place-order"
        disabled={isEmpty}
        onClick={onPlaceOrder}
      >
        {isEmpty ? "Add items to order" : `Place Order · ₹${isEmpty ? 0 : subtotal + DELIVERY_CHARGE}`}
      </button>
    </div>
  );
}
