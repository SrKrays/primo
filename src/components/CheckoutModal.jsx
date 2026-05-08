import React, { useState } from 'react';
import { USD_TO_ARS, WA_NUMBER } from '../data/products';

// ============================================================
// CheckoutModal — Modal de confirmación de pedido (Mobile-First)
// Incluye: forma de entrega + método de pago (estilo Bruss)
// ============================================================

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CheckoutModal({ isOpen, cart, onClose }) {
  const [name, setName]           = useState('');
  const [phone, setPhone]         = useState('');
  const [address, setAddress]     = useState('');
  const [note, setNote]           = useState('');
  const [delivery, setDelivery]   = useState(''); // 'retiro' | 'envio'
  const [payment, setPayment]     = useState(''); // 'efectivo' | 'tarjeta' | 'transferencia'

  const totalUSD = cart.reduce((s, i) => s + i.p.priceUSD * i.qty, 0);
  const totalARS = (totalUSD * USD_TO_ARS).toLocaleString('es-AR');

  const handleSend = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Por favor completá nombre y teléfono.');
      return;
    }
    if (!delivery) {
      alert('Por favor seleccioná una forma de entrega.');
      return;
    }
    if (!payment) {
      alert('Por favor seleccioná una forma de pago.');
      return;
    }
    if (delivery === 'envio' && !address.trim()) {
      alert('Por favor ingresá la dirección de entrega.');
      return;
    }

    const items = cart
      .map(i => `• ${i.p.name} ${i.storage ? `(${i.storage})` : ''} x${i.qty} = $${(i.p.priceUSD * i.qty).toLocaleString()} USD`)
      .join('\n');

    const deliveryLabel = delivery === 'retiro' ? 'Lo retiro personalmente' : `Envío a domicilio: ${address}`;
    const paymentLabel  = payment === 'efectivo' ? 'Efectivo' : payment === 'tarjeta' ? 'Tarjeta' : 'Transferencia';

    const msg = `🍎 *Nuevo pedido - iStore*\n\n👤 *Nombre:* ${name}\n📞 *Teléfono:* ${phone}\n🚚 *Entrega:* ${deliveryLabel}\n💳 *Pago:* ${paymentLabel}${note ? `\n📝 *Nota:* ${note}` : ''}\n\n📦 *Productos:*\n${items}\n\n💰 *Total:* $${totalUSD.toLocaleString()} USD / $${totalARS} ARS\n\n¡Gracias por tu compra! 🙌`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .checkout-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 4000;
          display: flex; align-items: flex-end; justify-content: center;
          backdrop-filter: blur(6px);
          animation: fadeIn 0.2s ease;
        }
        @media (min-width: 640px) {
          .checkout-overlay { align-items: center; padding: 20px; }
        }

        .checkout-box {
          background: #111;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-height: 95dvh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 20px 40px;
          position: relative;
          color: white;
        }
        @media (min-width: 640px) {
          .checkout-box {
            border-radius: 20px;
            max-width: 520px;
            max-height: 90vh;
            padding: 32px;
          }
        }

        .checkout-handle {
          width: 36px; height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.15); margin: 0 auto 20px;
        }
        @media (min-width: 640px) { .checkout-handle { display: none; } }

        .checkout-close-btn {
          position: absolute; top: 16px; right: 16px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: none;
          color: rgba(255,255,255,0.7); font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .checkout-close-btn:hover { background: rgba(255,255,255,0.18); }

        .checkout-title {
          font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 6px;
        }
        @media (min-width: 640px) { .checkout-title { font-size: 26px; } }

        .checkout-sub {
          font-size: 13px; color: rgba(255,255,255,0.45);
          margin-bottom: 24px; line-height: 1.5;
        }

        /* ── Resumen superior ── */
        .checkout-summary {
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 14px 16px; margin-bottom: 24px;
        }
        .checkout-summary-title {
          font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 10px;
        }
        .checkout-summary-item {
          display: flex; justify-content: space-between;
          font-size: 13px; color: rgba(255,255,255,0.7);
          padding: 4px 0;
        }
        .checkout-total-row {
          display: flex; justify-content: space-between;
          font-size: 15px; font-weight: 700; color: white;
          border-top: 0.5px solid rgba(255,255,255,0.1);
          margin-top: 10px; padding-top: 10px;
        }

        /* ── Form fields ── */
        .co-label {
          font-size: 11px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 6px; display: flex; align-items: center; gap: 4px;
        }
        .co-label .co-req { color: #ff453a; font-size: 13px; }

        .co-input {
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 13px 14px;
          color: white; font-size: 14px; outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .co-input::placeholder { color: rgba(255,255,255,0.25); }
        .co-input:focus { border-color: rgba(255,255,255,0.3); }

        .co-group { margin-bottom: 16px; }

        /* ── Toggle chips (entrega / pago) ── */
        .co-chips {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .co-chip {
          flex: 1; min-width: 100px;
          padding: 11px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.55); font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.18s; text-align: center;
          font-family: inherit; min-height: 44px;
        }
        .co-chip:hover { border-color: rgba(255,255,255,0.25); color: white; }
        .co-chip.selected {
          background: rgba(0,113,227,0.2);
          border-color: var(--accent);
          color: #60a5fa;
          font-weight: 600;
        }

        /* Address field animated */
        .co-address-wrap {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .co-address-wrap.visible {
          max-height: 100px;
          opacity: 1;
        }

        /* ── Send button ── */
        .btn-send-wp {
          width: 100%; padding: 16px;
          background: var(--whatsapp); color: white;
          border: none; border-radius: 14px;
          font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          margin-top: 24px; display: flex; align-items: center; justify-content: center; gap: 8px;
          min-height: 56px; font-family: inherit;
        }
        .btn-send-wp:hover { filter: brightness(1.08); transform: scale(1.01); }
        .btn-send-wp:active { transform: scale(0.98); }
      `}</style>

      <div className="checkout-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="checkout-box">
          <div className="checkout-handle" />
          <button className="checkout-close-btn" onClick={onClose}>✕</button>

          <div className="checkout-title">Confirmá tu pedido</div>
          <div className="checkout-sub">
            Completá tus datos y te enviamos el pedido por WhatsApp 📲
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
              <span>${totalUSD.toLocaleString()} USD</span>
            </div>
          </div>

          {/* Nombre */}
          <div className="co-group">
            <div className="co-label">Nombre y apellido <span className="co-req">*</span></div>
            <input
              className="co-input"
              placeholder="¿Cómo te llamás?"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          {/* Teléfono */}
          <div className="co-group">
            <div className="co-label">Teléfono / WhatsApp <span className="co-req">*</span></div>
            <input
              className="co-input"
              type="tel"
              placeholder="+54 9 351..."
              value={phone}
              onChange={e => setPhone(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          {/* Forma de entrega */}
          <div className="co-group">
            <div className="co-label">Forma de entrega <span className="co-req">*</span></div>
            <div className="co-chips">
              <button
                className={`co-chip${delivery === 'retiro' ? ' selected' : ''}`}
                onClick={() => setDelivery('retiro')}
              >
                Lo retiro personalmente
              </button>
              <button
                className={`co-chip${delivery === 'envio' ? ' selected' : ''}`}
                onClick={() => setDelivery('envio')}
              >
                Necesito que me lo envíen
              </button>
            </div>
          </div>

          {/* Dirección (solo si eligió envío) */}
          <div className={`co-address-wrap${delivery === 'envio' ? ' visible' : ''}`}>
            <div className="co-group">
              <div className="co-label">Dirección de entrega <span className="co-req">*</span></div>
              <input
                className="co-input"
                placeholder="Calle, número, ciudad"
                value={address}
                onChange={e => setAddress(e.target.value)}
                autoComplete="street-address"
              />
            </div>
          </div>

          {/* Forma de pago */}
          <div className="co-group">
            <div className="co-label">Forma de pago <span className="co-req">*</span></div>
            <div className="co-chips">
              {[
                { key: 'efectivo',      label: 'Efectivo' },
                { key: 'tarjeta',       label: 'Tarjeta' },
                { key: 'transferencia', label: 'Transferencia' },
              ].map(opt => (
                <button
                  key={opt.key}
                  className={`co-chip${payment === opt.key ? ' selected' : ''}`}
                  onClick={() => setPayment(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nota opcional */}
          <div className="co-group">
            <div className="co-label">Nota adicional (opcional)</div>
            <textarea
              className="co-input"
              rows="2"
              placeholder="Algún detalle del pedido..."
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          <button className="btn-send-wp" onClick={handleSend}>
            <WhatsAppIcon />
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
