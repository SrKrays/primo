import React from 'react';
import { USD_TO_ARS } from '../data/products';

// ============================================================
// CartDrawer — Panel lateral del carrito (Mobile-First)
// ============================================================

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ctext y='40' font-size='40'%3E%F0%9F%93%B1%3C/text%3E%3C/svg%3E";

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CartDrawer({ isOpen, cart, onClose, onChangeQty, onRemove, onCheckout }) {
  const totalUSD = cart.reduce((s, i) => s + i.p.priceUSD * i.qty, 0);
  const totalARS = (totalUSD * USD_TO_ARS).toLocaleString('es-AR');

  return (
    <>
      <style>{`
        .drawer-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          z-index: 2999; display: none;
        }
        .drawer-overlay.open { display: block; }

        /* Mobile: full width drawer from bottom */
        .cart-drawer {
          position: fixed;
          left: 0; right: 0; bottom: -100%;
          height: 92dvh;
          background: white; z-index: 3000;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
          transition: bottom 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
          display: flex; flex-direction: column;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
        }
        .cart-drawer.open { bottom: 0; }

        /* Tablet+: side drawer */
        @media (min-width: 480px) {
          .cart-drawer {
            top: 0; right: -420px; bottom: 0; left: auto;
            width: min(420px, 90vw);
            height: 100%;
            border-radius: 0;
            box-shadow: -20px 0 60px rgba(0,0,0,0.15);
            transition: right 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .cart-drawer.open { right: 0; bottom: 0; }
        }

        /* Drag handle - only on mobile */
        .cart-drag-handle {
          width: 36px; height: 4px; border-radius: 2px;
          background: var(--border); margin: 10px auto 0;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .cart-drag-handle { display: none; }
        }

        .cart-head {
          padding: 16px 20px; border-bottom: 0.5px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .cart-head { padding: 24px; }
        }

        .cart-title { font-size: 18px; font-weight: 700; }
        @media (min-width: 480px) {
          .cart-title { font-size: 20px; }
        }

        .cart-close {
          background: var(--silver); border: none;
          width: 36px; height: 36px; border-radius: 50%;
          cursor: pointer; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cart-items {
          flex: 1; overflow-y: auto; padding: 12px 16px;
          -webkit-overflow-scrolling: touch;
        }
        @media (min-width: 480px) {
          .cart-items { padding: 16px 24px; }
        }

        .cart-item {
          display: flex; gap: 12px; padding: 14px 0;
          border-bottom: 0.5px solid var(--border); align-items: flex-start;
        }
        .cart-item img {
          width: 60px; height: 60px; object-fit: contain;
          background: var(--silver); border-radius: 10px; padding: 6px; flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .cart-item img { width: 64px; height: 64px; padding: 8px; }
        }

        .cart-item-name { font-size: 13px; font-weight: 600; line-height: 1.3; }
        @media (min-width: 480px) {
          .cart-item-name { font-size: 14px; }
        }

        .cart-item-detail { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .cart-item-price { font-size: 14px; font-weight: 600; margin-top: 4px; }
        @media (min-width: 480px) {
          .cart-item-price { font-size: 15px; }
        }

        .cart-item-remove {
          margin-left: auto; background: none; border: none;
          color: var(--text-muted); cursor: pointer; font-size: 20px;
          padding: 4px; flex-shrink: 0; min-width: 36px; min-height: 36px;
          display: flex; align-items: center; justify-content: center;
        }
        .cart-item-remove:hover { color: #ff3b30; }

        .cart-qty { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .qty-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid var(--border); background: white;
          cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
        }
        .qty-btn:hover { background: var(--silver); }

        .cart-foot {
          padding: 16px; border-top: 0.5px solid var(--border);
          background: var(--silver); flex-shrink: 0;
          /* Safe area for home indicator on iOS */
          padding-bottom: max(16px, env(safe-area-inset-bottom));
        }
        @media (min-width: 480px) {
          .cart-foot { padding: 20px 24px; }
        }

        .cart-total-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
        @media (min-width: 480px) {
          .cart-total-row { font-size: 15px; }
        }

        .cart-total-row.big {
          font-size: 16px; font-weight: 700;
          margin-top: 10px; padding-top: 10px; border-top: 0.5px solid var(--border);
        }
        @media (min-width: 480px) {
          .cart-total-row.big { font-size: 18px; margin-top: 12px; padding-top: 12px; }
        }

        .btn-checkout {
          width: 100%; padding: 15px;
          background: var(--whatsapp); color: white;
          border: none; border-radius: 14px;
          font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          margin-top: 14px; display: flex; align-items: center; justify-content: center; gap: 8px;
          min-height: 52px;
        }
        @media (min-width: 480px) {
          .btn-checkout { font-size: 16px; padding: 16px; margin-top: 16px; }
        }
        .btn-checkout:hover { transform: scale(1.02); filter: brightness(1.05); }
        .btn-checkout:active { transform: scale(0.98); }

        .cart-empty { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .cart-empty-icon { font-size: 48px; margin-bottom: 16px; }
      `}</style>

      <div className={`drawer-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />

      <div className={`cart-drawer${isOpen ? ' open' : ''}`}>
        <div className="cart-drag-handle" />

        <div className="cart-head">
          <span className="cart-title">Mi Carrito 🛍️</span>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.key}>
                <img
                  src={item.p.img}
                  alt={item.p.name}
                  onError={e => { e.target.src = FALLBACK_IMG; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cart-item-name">{item.p.name}</div>
                  <div className="cart-item-detail">
                    {item.storage ? `${item.storage} · ` : ''}USD ${item.p.priceUSD}
                  </div>
                  <div className="cart-qty">
                    <button className="qty-btn" onClick={() => onChangeQty(item.key, -1)}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => onChangeQty(item.key, 1)}>+</button>
                  </div>
                  <div className="cart-item-price">
                    USD ${(item.p.priceUSD * item.qty).toLocaleString()}
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => onRemove(item.key)}>×</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total-row">
              <span>Subtotal USD</span>
              <span>${totalUSD.toLocaleString()} USD</span>
            </div>
            <div className="cart-total-row">
              <span>Subtotal ARS</span>
              <span>${totalARS} ARS</span>
            </div>
            <div className="cart-total-row big">
              <span>Total</span>
              <span>${totalUSD.toLocaleString()} USD</span>
            </div>
            <button className="btn-checkout" onClick={onCheckout}>
              <WhatsAppIcon />
              Confirmar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
