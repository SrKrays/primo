import React, { useState } from 'react';
import { USD_TO_ARS } from '../data/products';

// ============================================================
// ProductCard — Tarjeta individual de producto (Mobile-First)
// ============================================================

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Ctext y='80' font-size='60'%3E%F0%9F%93%B1%3C/text%3E%3C/svg%3E";

export default function ProductCard({ product, onOpenModal, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const storage = product.storage?.[0] || '';
  const priceARS = (product.priceUSD * USD_TO_ARS).toLocaleString('es-AR');

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, storage);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <style>{`
        .product-card {
          background: var(--card-bg); border-radius: 16px;
          border: 0.5px solid var(--border);
          overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .product-card:active { transform: scale(0.98); }

        .product-img-wrap {
          background: var(--silver); padding: 20px 16px;
          text-align: center; position: relative;
        }
        @media (min-width: 768px) {
          .product-img-wrap { padding: 32px; }
        }

        .product-img-wrap img {
          height: 120px; object-fit: contain; transition: transform 0.3s;
          width: 100%; max-width: 180px;
        }
        @media (min-width: 768px) {
          .product-img-wrap img { height: 160px; max-width: none; }
        }

        .product-card:hover .product-img-wrap img { transform: scale(1.05); }

        .badge-new {
          position: absolute; top: 10px; left: 10px;
          background: var(--accent); color: white;
          font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 20px;
        }
        .badge-hot {
          position: absolute; top: 10px; left: 10px;
          background: #ff3b30; color: white;
          font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 20px;
        }
        @media (min-width: 768px) {
          .badge-new, .badge-hot { font-size: 11px; padding: 3px 10px; top: 12px; left: 12px; }
        }

        .product-info { padding: 14px 14px 16px; }
        @media (min-width: 768px) {
          .product-info { padding: 16px; }
        }

        .product-cat {
          font-size: 10px; font-weight: 600; letter-spacing: 1.2px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 3px;
        }
        @media (min-width: 768px) {
          .product-cat { font-size: 11px; letter-spacing: 1.5px; margin-bottom: 4px; }
        }

        .product-name {
          font-size: 14px; font-weight: 600; margin-bottom: 3px;
          letter-spacing: -0.2px; line-height: 1.3;
        }
        @media (min-width: 768px) {
          .product-name { font-size: 16px; margin-bottom: 4px; letter-spacing: -0.3px; }
        }

        .product-storage { font-size: 12px; color: var(--text-muted); margin-bottom: 10px; }
        @media (min-width: 768px) {
          .product-storage { margin-bottom: 12px; }
        }

        .price-usd {
          font-size: 16px; font-weight: 700; color: var(--primary); letter-spacing: -0.3px;
        }
        @media (min-width: 768px) {
          .price-usd { font-size: 18px; letter-spacing: -0.5px; }
        }

        .price-ars { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (min-width: 768px) {
          .price-ars { font-size: 13px; }
        }

        .color-dots { display: flex; gap: 5px; margin: 8px 0; }
        .color-dot {
          width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid white; box-shadow: 0 0 0 1.5px #d2d2d7;
          cursor: pointer; transition: transform 0.15s;
        }
        @media (min-width: 768px) {
          .color-dot { width: 14px; height: 14px; }
        }
        .color-dot:hover { transform: scale(1.3); }

        .btn-add {
          width: 100%; padding: 10px;
          background: var(--accent); color: white;
          border: none; border-radius: 10px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          margin-top: 10px; min-height: 42px;
        }
        @media (min-width: 768px) {
          .btn-add { font-size: 14px; }
        }
        .btn-add:hover { background: var(--accent-hover); transform: scale(1.02); }
        .btn-add:active { transform: scale(0.97); }
        .btn-add.added { background: var(--success); }
      `}</style>

      <div className="col-6 col-sm-6 col-lg-4 fade-in">
        <div className="product-card" onClick={() => onOpenModal(product, storage)}>
          <div className="product-img-wrap">
            {product.badge === 'new' && <div className="badge-new">Nuevo</div>}
            {product.badge === 'hot' && <div className="badge-hot">🔥 Popular</div>}
            <img
              src={product.img}
              alt={product.name}
              onError={e => { e.target.src = FALLBACK_IMG; }}
            />
          </div>

          <div className="product-info">
            <div className="product-cat">{product.cat}</div>
            <div className="product-name">{product.name}</div>
            {storage && <div className="product-storage">{storage}</div>}

            <div className="color-dots">
              {(product.colors || []).slice(0, 4).map((color, i) => (
                <div key={i} className="color-dot" style={{ background: color }} />
              ))}
            </div>

            <div className="price-usd">USD ${product.priceUSD.toLocaleString()}</div>
            <div className="price-ars">ARS ${priceARS}</div>

            <button
              className={`btn-add${added ? ' added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Agregado' : '+ Agregar'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
