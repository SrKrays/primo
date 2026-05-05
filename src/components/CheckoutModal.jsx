import React, { useState } from 'react';
import { USD_TO_ARS, WA_NUMBER } from '../data/products';

// ============================================================
// CheckoutModal — Modal de confirmación de pedido por WhatsApp
// ============================================================

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CheckoutModal({ isOpen, cart, onClose }) {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote]       = useState('');

  const totalUSD = cart.reduce((s, i) => s + i.p.priceUSD * i.qty, 0);
  const totalARS = (totalUSD * USD_TO_ARS).toLocaleString('es-AR');

  const handleSend = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Por favor completá nombre, teléfono y dirección.');
      return;
    }
    const items = cart
      .map(i => `• ${i.p.name} ${i.storage ? `(${i.storage})` : ''} x${i.qty} = $${(i.p.priceUSD * i.qty).toLocaleString()} USD`)
      .join('\n');
    const msg = `🍎 *Nuevo pedido - iStore*\n\n👤 *Nombre:* ${name}\n📞 *Teléfono:* ${phone}\n📍 *Dirección:* ${address}${note ? `\n📝 *Nota:* ${note}` : ''}\n\n📦 *Productos:*\n${items}\n\n💰 *Total:* $${totalUSD.toLocaleString()} USD / $${totalARS} ARS\n\n¡Gracias por tu compra! 🙌`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .checkout-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 4000; display: flex; align-items: center; justify-content: center;
          padding: 20px; backdrop-filter: blur(6px);
          animation: fadeIn 0.2s ease;
        }
        .checkout-box {
          background: white; border-radius: 24px;
          max-width: 500px; width: 100%; padding: 40px;
          position: relative; max-height: 90vh; overflow-y: auto;
        }
        .checkout-title { font-size: 24px; font-weight: 700; margin-bottom: 6px; }
        .checkout-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; }
        .form-group { margin-bottom: 16px; }
        .form-label {
          font-size: 12px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: var(--text-muted);
          margin-bottom: 6px; display: block;
        }
        .form-control {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid var(--border); border-radius: 12px;
          font-size: 15px; outline: none; transition: border-color 0.2s;
          font-family: inherit;
        }
        .form-control:focus { border-color: var(--accent); }
        .checkout-summary {
          background: var(--silver); border-radius: 14px;
          padding: 16px; margin: 20px 0;
        }
        .checkout-summary-title {
          font-size: 13px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 1px;
          color: var(--text-muted); margin-bottom: 12px;
        }
        .checkout-summary-item {
          display: flex; justify-content: space-between;
          font-size: 14px; margin-bottom: 6px;
        }
        .checkout-total-row {
          border-top: 0.5px solid var(--border);
          padding-top: 10px; margin-top: 10px;
          display: flex; justify-content: space-between; font-weight: 700;
        }
        .btn-send-wp {
          width: 100%; padding: 16px;
          background: var(--whatsapp); color: white;
          border: none; border-radius: 14px;
          font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .btn-send-wp:hover { transform: scale(1.02); }
      `}</style>

      <div className="checkout-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="checkout-box">
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="checkout-title">Confirmar pedido</div>
          <div className="checkout-sub">
            Completá tus datos y te enviamos el pedido por WhatsApp 📲
          </div>

          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input
              className="form-control"
              placeholder="Tu nombre"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Teléfono / WhatsApp</label>
            <input
              className="form-control"
              placeholder="+54 9 351..."
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Dirección de entrega</label>
            <input
              className="form-control"
              placeholder="Calle, número, ciudad"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nota adicional (opcional)</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Algún detalle del pedido..."
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          {/* Resumen */}
          <div className="checkout-summary">
            <div className="checkout-summary-title">Resumen del pedido</div>
            {cart.map(i => (
              <div className="checkout-summary-item" key={i.key}>
                <span>{i.p.name} {i.storage ? `(${i.storage})` : ''} x{i.qty}</span>
                <span>${(i.p.priceUSD * i.qty).toLocaleString()} USD</span>
              </div>
            ))}
            <div className="checkout-total-row">
              <span>Total</span>
              <span>${totalUSD.toLocaleString()} USD / ${totalARS} ARS</span>
            </div>
          </div>

          <button className="btn-send-wp" onClick={handleSend}>
            <WhatsAppIcon />
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
