import React, { useState, useEffect } from 'react';
import { USD_TO_ARS } from '../data/products';

// ============================================================
// ProductModal — Modal de detalle (Mobile-First: full screen en mobile)
// ============================================================

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Ctext y='100' font-size='80'%3E%F0%9F%93%B1%3C/text%3E%3C/svg%3E";

export default function ProductModal({ product, initialStorage, onClose, onAddToCart }) {
  const [selectedStorage, setSelectedStorage] = useState(initialStorage || '');

  useEffect(() => {
    setSelectedStorage(initialStorage || (product?.storage?.[0]) || '');
  }, [product, initialStorage]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product) return null;

  const priceARS = (product.priceUSD * USD_TO_ARS).toLocaleString('es-AR');

  const handleAdd = () => {
    onAddToCart(product, selectedStorage);
    onClose();
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          z-index: 2000; display: flex; align-items: flex-end; justify-content: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
        }

        @media (min-width: 640px) {
          .modal-overlay { align-items: center; padding: 20px; }
        }

        .modal-box {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-height: 95dvh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0;
          position: relative;
        }

        @media (min-width: 640px) {
          .modal-box {
            border-radius: 24px;
            max-width: 900px;
            max-height: 90vh;
          }
        }

        /* Drag handle for mobile */
        .modal-handle {
          width: 36px; height: 4px; border-radius: 2px;
          background: var(--border); margin: 12px auto 0;
        }
        @media (min-width: 640px) {
          .modal-handle { display: none; }
        }

        .modal-close {
          position: absolute; top: 16px; right: 16px;
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--silver); border: none;
          font-size: 16px; cursor: pointer; z-index: 10;
          display: flex; align-items: center; justify-content: center;
        }

        .modal-inner { padding: 20px 16px 32px; }
        @media (min-width: 640px) {
          .modal-inner { padding: 40px; }
        }

        .modal-img-wrap {
          background: var(--silver); border-radius: 14px; padding: 20px;
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 220px; overflow: hidden; margin-bottom: 20px;
        }
        @media (min-width: 640px) {
          .modal-img-wrap { height: 300px; margin-bottom: 0; border-radius: 16px; }
        }

        .modal-img {
          width: 100%; height: 100%;
          object-fit: contain; object-position: center;
        }

        .modal-badge {
          display: inline-block; background: var(--silver);
          padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 1px; color: var(--text-muted); margin-bottom: 10px;
        }
        .modal-title { font-size: 22px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 8px; }
        @media (min-width: 640px) {
          .modal-title { font-size: 28px; letter-spacing: -1px; }
        }

        .modal-desc { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 18px; }
        @media (min-width: 640px) {
          .modal-desc { font-size: 15px; margin-bottom: 20px; }
        }

        .modal-price-usd { font-size: 26px; font-weight: 700; letter-spacing: -1px; }
        @media (min-width: 640px) {
          .modal-price-usd { font-size: 32px; }
        }
        .modal-price-ars { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
        @media (min-width: 640px) {
          .modal-price-ars { font-size: 16px; }
        }

        .spec-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        .spec-table td { padding: 9px 0; border-bottom: 0.5px solid var(--border); font-size: 13px; }
        @media (min-width: 640px) {
          .spec-table td { padding: 10px 0; font-size: 14px; }
        }
        .spec-table td:first-child { color: var(--text-muted); width: 44%; }
        .spec-table td:last-child { font-weight: 500; text-align: right; }

        .storage-label { margin-bottom: 8px; font-size: 12px; color: var(--text-muted); font-weight: 600; letter-spacing: 0.5px; }
        .storage-btn {
          padding: 8px 16px; border-radius: 10px;
          border: 1.5px solid var(--border); background: white;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all 0.2s; margin: 3px; min-height: 40px;
        }
        @media (min-width: 640px) {
          .storage-btn { padding: 8px 20px; font-size: 14px; margin: 4px; }
        }
        .storage-btn.active { border-color: var(--accent); color: var(--accent); background: #e8f1fb; }

        .btn-modal-add {
          padding: 15px 40px; border-radius: 980px;
          background: var(--accent); color: white;
          border: none; font-size: 16px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; width: 100%;
          margin-top: 18px; min-height: 52px;
        }
        .btn-modal-add:hover { background: var(--accent-hover); }
        .btn-modal-add:active { transform: scale(0.98); }
      `}</style>

      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <div className="modal-handle" />
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="modal-inner">
            <div className="row g-0 g-md-4">
              {/* Imagen */}
              <div className="col-12 col-md-5">
                <div className="modal-img-wrap">
                  <img
                    className="modal-img"
                    src={product.img}
                    alt={product.name}
                    onError={e => { e.target.src = FALLBACK_IMG; }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="col-12 col-md-7" style={{ paddingTop: 0 }}>
                <div className="modal-badge">{product.cat}</div>
                <div className="modal-title">{product.name}</div>
                <div className="modal-desc">{product.desc}</div>


                <div className="modal-price-usd">USD ${product.priceUSD.toLocaleString()}</div>
                <div className="modal-price-ars">ARS ${priceARS}</div>

                <table className="spec-table">
                  <tbody>
                    {product.specs.map(([k, v], i) => (
                      <tr key={i}>
                        <td>{k}</td>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button className="btn-modal-add" onClick={handleAdd}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}