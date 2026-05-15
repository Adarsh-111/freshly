import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function addItem(product) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { cart, itemCount, addItem, updateQty, removeItem, clearCart, subtotal };
}
