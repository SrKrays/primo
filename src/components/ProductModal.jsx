import React, { useState, useEffect } from 'react';
import { USD_TO_ARS } from '../data/products';

// ============================================================
// ProductModal — Modal de detalle del producto
// ============================================================

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Ctext y='100' font-size='80'%3E%F0%9F%93%B1%3C/text%3E%3C/svg%3E";

export default function ProductModal({ product, initialStorage, onClose, onAddToCart }) {
  const [selectedStorage, setSelectedStorage] = useState(initialStorage || '');

  useEffect(() => {
    setSelectedStorage(initialStorage || (product?.storage?.[0]) || '');
  }, [product, initialStorage]);

  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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
          z-index: 2000; display: flex; align-items: center; justify-content: center;
          padding: 20px; backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
        }
        .modal-box {
          background: white; border-radius: 24px;
          max-width: 900px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          padding: 40px; position: relative;
        }
        .modal-close {
          position: absolute; top: 20px; right: 20px;
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--silver); border: none;
          font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .modal-img-wrap {
          background: var(--silver); border-radius: 16px; padding: 24px;
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 300px; overflow: hidden;
        }
        .modal-img {
          width: 100%; height: 100%;
          object-fit: contain; object-position: center;
        }
        .modal-badge {
          display: inline-block; background: var(--silver);
          padding: 4px 12px; border-radius: 20px;
          font-size: 12px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 1px; color: var(--text-muted); margin-bottom: 12px;
        }
        .modal-title { font-size: 28px; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px; }
        .modal-desc { color: var(--text-muted); font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
        .modal-price-usd { font-size: 32px; font-weight: 700; letter-spacing: -1px; }
        .modal-price-ars { font-size: 16px; color: var(--text-muted); margin-top: 4px; }
        .spec-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .spec-table td { padding: 10px 0; border-bottom: 0.5px solid var(--border); font-size: 14px; }
        .spec-table td:first-child { color: var(--text-muted); width: 40%; }
        .spec-table td:last-child { font-weight: 500; text-align: right; }
        .storage-label { margin-bottom: 8px; font-size: 13px; color: var(--text-muted); font-weight: 600; }
        .storage-btn {
          padding: 8px 20px; border-radius: 10px;
          border: 1.5px solid var(--border); background: white;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.2s; margin: 4px;
        }
        .storage-btn.active { border-color: var(--accent); color: var(--accent); background: #e8f1fb; }
        .btn-modal-add {
          padding: 16px 40px; border-radius: 980px;
          background: var(--accent); color: white;
          border: none; font-size: 16px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; width: 100%; margin-top: 20px;
        }
        .btn-modal-add:hover { background: var(--accent-hover); }
      `}</style>

      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="row">
            {/* Imagen */}
            <div className="col-md-5">
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
            <div className="col-md-7 ps-md-4 pt-4 pt-md-0">
              <div className="modal-badge">{product.cat}</div>
              <div className="modal-title">{product.name}</div>
              <div className="modal-desc">{product.desc}</div>

              {/* Storage */}
              {product.storage?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div className="storage-label">ALMACENAMIENTO</div>
                  {product.storage.map(s => (
                    <button
                      key={s}
                      className={`storage-btn${selectedStorage === s ? ' active' : ''}`}
                      onClick={() => setSelectedStorage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div className="modal-price-usd">USD ${product.priceUSD.toLocaleString()}</div>
              <div className="modal-price-ars">ARS ${priceARS}</div>

              {/* Specs */}
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
    </>
  );
}
