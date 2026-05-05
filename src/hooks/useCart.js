import { useState } from 'react';

// ============================================================
// useCart — Hook para manejo del carrito de compras
// ============================================================
export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, storage = '') => {
    const key = product.id + (storage || '');
    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { key, p: product, storage, qty: 1 }];
    });
  };

  const removeFromCart = (key) => {
    setCart(prev => prev.filter(i => i.key !== key));
  };

  const changeQty = (key, delta) => {
    setCart(prev => {
      const updated = prev.map(i =>
        i.key === key ? { ...i, qty: i.qty + delta } : i
      );
      return updated.filter(i => i.qty > 0);
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalUSD   = cart.reduce((sum, i) => sum + i.p.priceUSD * i.qty, 0);

  return { cart, addToCart, removeFromCart, changeQty, clearCart, totalItems, totalUSD };
}
