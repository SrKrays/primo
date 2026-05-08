import React, { useState } from 'react';
import { USD_TO_ARS } from '../data/products';

// ============================================================
// ProductCard — Card con overlay deslizante (sin flip 3D)
// Frente: imagen / Overlay: info básica + botón "Ver más"
// El botón "Ver más" abre el ProductModal
// ============================================================

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Ctext y='90' x='50%25' text-anchor='middle' font-size='70'%3E📱%3C/text%3E%3C/svg%3E";

const styles = `
  .prod-card-outer {
    height: 340px;
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    border: 0.5px solid var(--border);
    background: var(--card-bg);
    -webkit-tap-highlight-color: transparent;
  }
  @media (min-width: 576px) { .prod-card-outer { height: 360px; } }
  @media (min-width: 992px) { .prod-card-outer { height: 380px; } }

  /* FRENTE */
  .prod-card-front {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .prod-card-outer.revealed .prod-card-front {
    opacity: 0;
    transform: scale(0.97);
    pointer-events: none;
  }

  .prod-front-img {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--silver);
    padding: 24px;
    position: relative;
  }
  .prod-front-img img {
    width: 100%;
    max-width: 180px;
    height: 200px;
    object-fit: contain;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
  }

  .prod-badge {
    position: absolute;
    top: 12px; left: 12px;
    font-size: 10px; font-weight: 700;
    padding: 3px 10px; border-radius: 20px;
    letter-spacing: 0.5px; z-index: 2;
  }
  .prod-badge-new { background: var(--accent); color: white; }
  .prod-badge-hot { background: #ff3b30; color: white; }

  .prod-front-footer {
    padding: 14px 16px 16px;
    background: white;
    border-top: 0.5px solid var(--border);
  }
  .prod-front-name {
    font-size: 13px; font-weight: 600;
    color: var(--primary); margin-bottom: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .prod-front-price {
    font-size: 13px; font-weight: 700;
    color: var(--accent); margin-bottom: 4px;
  }
  .prod-hint {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600;
    color: var(--text-muted); letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .prod-color-dots { display: flex; gap: 5px; margin-bottom: 6px; }
  .prod-color-dot {
    width: 10px; height: 10px; border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 0 1.5px var(--border);
    flex-shrink: 0;
  }

  /* DORSO */
  .prod-card-back {
    position: absolute;
    inset: 0;
    background: #1d1d1f;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 20px 20px;
    opacity: 0;
    transform: scale(1.03);
    transition: opacity 0.35s ease, transform 0.35s ease;
    pointer-events: none;
  }
  .prod-card-outer.revealed .prod-card-back {
    opacity: 1;
    transform: scale(1);
    pointer-events: all;
  }

  .prod-back-cat {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 6px;
  }
  .prod-back-name {
    font-size: 18px; font-weight: 700; color: white;
    letter-spacing: -0.5px; line-height: 1.2; margin-bottom: 10px;
  }
  .prod-back-divider {
    width: 32px; height: 2px;
    background: var(--accent); border-radius: 1px; margin-bottom: 14px;
  }
  .prod-back-desc {
    font-size: 13px; color: rgba(255,255,255,0.6);
    line-height: 1.7; flex: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  .prod-back-price-usd {
    font-size: 24px; font-weight: 700; color: white;
    letter-spacing: -0.5px; margin-top: 14px; margin-bottom: 2px;
  }
  .prod-back-price-ars {
    font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 16px;
  }

  .btn-prod-ver-mas {
    width: 100%; padding: 12px; border-radius: 12px;
    border: none; background: var(--accent); color: white;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    min-height: 46px; font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .btn-prod-ver-mas:hover { background: var(--accent-hover); }
  .btn-prod-ver-mas:active { transform: scale(0.97); }
`;

export default function ProductCard({ product, onOpenModal, onAddToCart }) {
  const [revealed, setRevealed] = useState(false);

  const priceARS = (product.priceUSD * USD_TO_ARS).toLocaleString('es-AR');

  return (
    <>
      <style>{styles}</style>

      <div className="col-6 col-sm-6 col-lg-4 fade-in">
        <div
          className={`prod-card-outer${revealed ? ' revealed' : ''}`}
          onMouseEnter={() => setRevealed(true)}
          onMouseLeave={() => setRevealed(false)}
          onClick={() => setRevealed(f => !f)}
          role="article"
          aria-label={product.name}
        >

          {/* FRENTE */}
          <div className="prod-card-front">
            <div className="prod-front-img">
              {product.badge === 'new' && (
                <span className="prod-badge prod-badge-new">Nuevo</span>
              )}
              {product.badge === 'hot' && (
                <span className="prod-badge prod-badge-hot">🔥 Popular</span>
              )}
              <img
                src={product.img}
                alt={product.name}
                onError={(e) => { e.target.src = FALLBACK_IMG; }}
              />
            </div>
            <div className="prod-front-footer">
              {product.colors?.length > 0 && (
                <div className="prod-color-dots">
                  {product.colors.slice(0, 5).map((c, i) => (
                    <span key={i} className="prod-color-dot" style={{ background: c }} />
                  ))}
                </div>
              )}
              <div className="prod-front-name">{product.name}</div>
              <div className="prod-front-price">USD ${product.priceUSD.toLocaleString()}</div>
              <div className="prod-hint">
                Ver más
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* DORSO */}
          <div className="prod-card-back">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="prod-back-cat">{product.cat}</div>
              <div className="prod-back-name">{product.name}</div>
              <div className="prod-back-divider" />
              <div className="prod-back-desc">{product.desc}</div>
            </div>

            <div>
              <div className="prod-back-price-usd">
                USD ${product.priceUSD.toLocaleString()}
              </div>
              <div className="prod-back-price-ars">ARS ${priceARS}</div>

              <button
                className="btn-prod-ver-mas"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(product, product.storage?.[0] || '');
                }}
              >
                Ver más
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
