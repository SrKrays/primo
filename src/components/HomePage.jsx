import React, { useRef, useState } from 'react';
import { products, USD_TO_ARS } from '../data/products';

// ============================================================
// HomePage — Página de inicio: Hero, Carousel, Populares, About
// ============================================================

const CARD_W = 280; // ancho de card del carrusel + gap

function CarouselCard({ product, onOpen }) {
  return (
    <div
      style={{
        minWidth: 260, background: 'white', borderRadius: 18, padding: 24,
        border: '0.5px solid var(--border)', cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        flexShrink: 0,
      }}
      onClick={() => onOpen(product, product.storage?.[0] || '')}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{ width: '100%', height: 160, objectFit: 'contain', marginBottom: 16 }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{product.name}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Desde <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>USD ${product.priceUSD}</strong>
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate, onOpenModal }) {
  const wrapRef    = useRef(null);
  const [pos, setPos] = useState(0);

  const featured = [
    ...products.iphones.slice(0, 3),
    ...products.airpods.slice(0, 2),
  ];
  const popular = [
    ...products.iphones.filter(p => p.badge === 'hot' || p.badge === 'new').slice(0, 3),
    ...products.airpods.slice(0, 1),
  ];

  const move = (dir) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const maxPos = Math.max(0, featured.length * CARD_W - wrap.offsetWidth);
    const next = Math.max(0, Math.min(pos + dir * CARD_W, maxPos));
    setPos(next);
  };

  return (
    <>
      <style>{`
        .hero {
          margin-top: var(--nav-height);
          background: linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 50%, #1a1a2e 100%);
          min-height: 520px;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          padding: 60px 0;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(0,113,227,0.15) 0%, transparent 60%);
        }
        .hero-content { color: white; position: relative; z-index: 1; }
        .hero-eyebrow {
          font-size: 13px; font-weight: 500; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 12px;
        }
        .hero-title {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 700; letter-spacing: -2px;
          line-height: 1.05; margin-bottom: 16px;
        }
        .hero-title span { color: #60a5fa; }
        .hero-sub { font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.7); margin-bottom: 32px; }
        .btn-hero {
          background: var(--accent); color: white;
          border: none; padding: 14px 32px;
          border-radius: 980px; font-size: 15px; font-weight: 500;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: transform 0.2s, background 0.2s;
        }
        .btn-hero:hover { background: var(--accent-hover); transform: scale(1.03); color: white; }
        .hero-img-wrap {
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        .hero-img {
          width: 100%; max-width: 360px;
          object-fit: contain; opacity: 0.95;
          filter: drop-shadow(0 40px 80px rgba(0,113,227,0.4));
          animation: fadeIn 0.6s ease 0.2s both;
        }
        .carousel-section { background: var(--silver); padding: 60px 0; }
        .section-label {
          font-size: 13px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;
        }
        .section-title { font-size: 32px; font-weight: 700; letter-spacing: -1px; margin-bottom: 32px; }
        .carousel-track-wrap { overflow: hidden; }
        .carousel-track { display: flex; gap: 20px; transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
        .carousel-nav { display: flex; gap: 12px; margin-top: 24px; align-items: center; }
        .carousel-btn {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid var(--border); background: white;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; font-size: 16px;
        }
        .carousel-btn:hover { background: var(--primary); color: white; border-color: var(--primary); }
        .products-section { padding: 60px 0; }
        .about-section { background: var(--silver); padding: 80px 0; }
        .about-card {
          background: white; border-radius: 20px; padding: 40px;
          border: 0.5px solid var(--border); text-align: center; transition: transform 0.2s;
        }
        .about-card:hover { transform: translateY(-4px); }
        .about-icon { font-size: 32px; margin-bottom: 16px; }
        .about-card-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .about-card-text { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content fade-in">
                <div className="hero-eyebrow">Nuevo · iPhone 16 Pro</div>
                <h1 className="hero-title">El futuro<br />en tu <span>mano.</span></h1>
                <p className="hero-sub">Chip A18 Pro · Cámara 48MP · Titanio</p>
                <button className="btn-hero" onClick={() => onNavigate('iphones')}>
                  Ver iPhones →
                </button>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex hero-img-wrap">
              <img
                className="hero-img"
                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770819096"
                alt="iPhone 16 Pro"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CARRUSEL ── */}
      <section className="carousel-section">
        <div className="container">
          <div className="section-label">Destacados</div>
          <div className="section-title">Lo más nuevo 🔥</div>
          <div className="carousel-track-wrap" ref={wrapRef}>
            <div className="carousel-track" style={{ transform: `translateX(-${pos}px)` }}>
              {featured.map(p => (
                <CarouselCard key={p.id} product={p} onOpen={onOpenModal} />
              ))}
            </div>
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={() => move(-1)}>←</button>
            <button className="carousel-btn" onClick={() => move(1)}>→</button>
          </div>
        </div>
      </section>

      {/* ── POPULARES ── */}
      <section className="products-section">
        <div className="container">
          <div className="section-label">Más vendidos</div>
          <div className="section-title">Populares 📱</div>
          <div className="row g-3">
            {popular.map(p => {
              const storage = p.storage?.[0] || '';
              const priceARS = (p.priceUSD * USD_TO_ARS).toLocaleString('es-AR');
              return (
                <div className="col-sm-6 col-lg-3 fade-in" key={p.id}>
                  <div
                    style={{
                      background: 'white', borderRadius: 18, border: '0.5px solid var(--border)',
                      overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onClick={() => onOpenModal(p, storage)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    <div style={{ background: 'var(--silver)', padding: 24, textAlign: 'center', position: 'relative' }}>
                      {p.badge === 'new' && <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Nuevo</div>}
                      {p.badge === 'hot' && <div style={{ position: 'absolute', top: 12, left: 12, background: '#ff3b30', color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>🔥 Popular</div>}
                      <img src={p.img} alt={p.name} style={{ height: 120, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{p.cat}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 17, fontWeight: 700 }}>USD ${p.priceUSD.toLocaleString()}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>ARS ${priceARS}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT CARDS ── */}
      <section className="about-section">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: '🚀', title: 'Entrega rápida', text: 'Coordinamos la entrega directamente con vos para que recibas tu producto lo antes posible.' },
              { icon: '✅', title: 'Garantía oficial', text: 'Todos nuestros productos son originales con garantía. Sin sorpresas, sin trucos.' },
              { icon: '💬', title: 'Atención personal', text: 'Hablás directo con nosotros por WhatsApp. Sin bots, sin formularios, sin esperas.' },
            ].map(card => (
              <div className="col-md-4" key={card.title}>
                <div className="about-card">
                  <div className="about-icon">{card.icon}</div>
                  <div className="about-card-title">{card.title}</div>
                  <div className="about-card-text">{card.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
