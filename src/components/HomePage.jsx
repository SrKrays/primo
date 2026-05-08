import React, { useRef, useEffect, useState } from 'react';
import { products, allProducts, WA_NUMBER } from '../data/products';
import ProductCard from './ProductCard';

// ============================================================
// HomePage — Página de inicio (Mobile-First)
//
// SECCIONES:
//   1. Hero          → Banner principal con CTA
//   2. InfiniteRail  → Carrusel infinito auto-scroll
//   3. Populares     → Grid con ProductCard (flip 3D)
//   4. About Cards   → 3 tarjetas de propuesta de valor
//   5. CTA Contact   → Sección "¿No encontrás lo que buscás?"
// ============================================================

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Ctext y='90' x='50%25' text-anchor='middle' font-size='70'%3E%F0%9F%93%B1%3C/text%3E%3C/svg%3E";

function InfiniteRail({ items, onOpen }) {
  const doubled = [...items, ...items];

  return (
    <div className="rail-outer" aria-label="Productos destacados">
      <div className="rail-track">
        {doubled.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="rail-card"
            onClick={() => onOpen(product, product.storage?.[0] || '')}
            role="button"
            tabIndex={0}
            aria-label={`Ver ${product.name}`}
            onKeyDown={e => e.key === 'Enter' && onOpen(product, product.storage?.[0] || '')}
          >
            {product.badge === 'new' && (
              <span className="rail-badge rail-badge-new">Nuevo</span>
            )}
            {product.badge === 'hot' && (
              <span className="rail-badge rail-badge-hot">🔥 Popular</span>
            )}
            <div className="rail-img-wrap">
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
                onError={e => { e.target.src = FALLBACK_IMG; }}
              />
            </div>
            <div className="rail-info">
              <div className="rail-name">{product.name}</div>
              <div className="rail-cat">{product.cat}</div>
              <div className="rail-price">
                USD <strong>${product.priceUSD.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function HomePage({ onNavigate, onOpenModal, onAddToCart }) {

  const popular = [
    ...products.iphones.filter(p => p.badge === 'hot' || p.badge === 'new').slice(0, 3),
    ...products.airpods.slice(0, 1),
  ];

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════
           HERO
        ══════════════════════════════════════ */
        .hero {
          margin-top: var(--nav-height);
          background: linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 50%, #1a1a2e 100%);
          min-height: 380px;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          padding: 40px 0;
        }
        @media (min-width: 768px) { .hero { min-height: 520px; padding: 60px 0; } }

        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(0,113,227,0.15) 0%, transparent 60%);
        }

        .hero-content { color: white; position: relative; z-index: 1; }
        .hero-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 10px;
        }
        @media (min-width: 768px) { .hero-eyebrow { font-size: 13px; margin-bottom: 12px; } }

        .hero-title {
          font-size: clamp(32px, 10vw, 72px);
          font-weight: 700; letter-spacing: -2px; line-height: 1.05; margin-bottom: 12px;
        }
        @media (min-width: 768px) { .hero-title { margin-bottom: 16px; } }
        .hero-title span { color: #60a5fa; }

        .hero-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.7); margin-bottom: 24px; }
        @media (min-width: 768px) { .hero-sub { font-size: 18px; margin-bottom: 32px; } }

        .btn-hero {
          background: var(--accent); color: white; border: none;
          padding: 12px 24px; border-radius: 980px; font-size: 14px; font-weight: 500;
          cursor: pointer; display: inline-block; transition: transform 0.2s, background 0.2s; min-height: 44px;
        }
        @media (min-width: 768px) { .btn-hero { padding: 14px 32px; font-size: 15px; } }
        .btn-hero:hover { background: var(--accent-hover); transform: scale(1.03); color: white; }
        .btn-hero:active { transform: scale(0.97); }

        .hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
        .hero-img {
          width: 100%; max-width: 280px; object-fit: contain; opacity: 0.95;
          filter: drop-shadow(0 40px 80px rgba(0,113,227,0.4));
          animation: fadeIn 0.6s ease 0.2s both;
        }
        @media (min-width: 768px) { .hero-img { max-width: 360px; } }

        /* ══════════════════════════════════════
           CARRUSEL INFINITO
        ══════════════════════════════════════ */
        .rail-section {
          background: var(--silver);
          padding: 40px 0;
          overflow: hidden;
        }
        @media (min-width: 768px) { .rail-section { padding: 60px 0; } }

        .rail-section-header {
          padding: 0 16px;
          margin-bottom: 24px;
        }
        @media (min-width: 576px) { .rail-section-header { padding: 0 20px; } }

        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;
        }
        @media (min-width: 768px) { .section-label { font-size: 13px; margin-bottom: 8px; } }

        .section-title { font-size: 24px; font-weight: 700; letter-spacing: -1px; }
        @media (min-width: 768px) { .section-title { font-size: 32px; } }

        .rail-outer {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          cursor: pointer;
        }

        .rail-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: railScroll 40s linear infinite;
        }
        .rail-outer:hover .rail-track {
          animation-play-state: paused;
        }

        @keyframes railScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .rail-card {
          position: relative;
          width: 160px; flex-shrink: 0;
          background: white; border-radius: 14px; padding: 14px;
          border: 0.5px solid var(--border);
          transition: transform 0.2s, box-shadow 0.2s;
          user-select: none;
        }
        @media (min-width: 480px) {
          .rail-card { width: 180px; padding: 16px; border-radius: 16px; }
        }
        .rail-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .rail-card:active { transform: scale(0.97); }

        .rail-badge {
          position: absolute; top: 10px; left: 10px;
          font-size: 9px; font-weight: 700; padding: 3px 8px;
          border-radius: 20px; letter-spacing: 0.5px; z-index: 2;
        }
        .rail-badge-new { background: var(--accent); color: white; }
        .rail-badge-hot { background: #ff3b30; color: white; }

        .rail-img-wrap {
          background: var(--silver);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          height: 120px; margin-bottom: 12px; overflow: hidden; padding: 10px;
        }
        @media (min-width: 480px) { .rail-img-wrap { height: 130px; } }

        .rail-img-wrap img {
          width: 100%; height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .rail-card:hover .rail-img-wrap img {
          transform: scale(1.06);
        }

        .rail-info { }
        .rail-name {
          font-size: 12px; font-weight: 600; line-height: 1.3;
          color: var(--primary); margin-bottom: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media (min-width: 480px) { .rail-name { font-size: 13px; } }

        .rail-cat {
          font-size: 10px; color: var(--text-muted); margin-bottom: 4px;
        }
        .rail-price {
          font-size: 12px; color: var(--text-muted);
        }
        .rail-price strong {
          color: var(--accent); font-weight: 700; font-size: 13px;
        }
        @media (min-width: 480px) {
          .rail-price strong { font-size: 14px; }
        }

        .rail-hint {
          text-align: center;
          margin-top: 16px;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        /* ══════════════════════════════════════
           POPULARES (grid de flip cards)
        ══════════════════════════════════════ */
        .products-section { padding: 40px 0; }
        @media (min-width: 768px) { .products-section { padding: 60px 0; } }

        .popular-grid { overflow: visible !important; }

        /* ══════════════════════════════════════
           ABOUT CARDS (propuesta de valor)
        ══════════════════════════════════════ */
        .about-section { background: var(--silver); padding: 48px 0; }
        @media (min-width: 768px) { .about-section { padding: 80px 0; } }

        .about-card {
          background: white; border-radius: 16px; padding: 28px 20px;
          border: 0.5px solid var(--border); text-align: center; transition: transform 0.2s;
        }
        @media (min-width: 768px) { .about-card { border-radius: 20px; padding: 40px; } }
        .about-card:hover { transform: translateY(-4px); }

        .about-icon { font-size: 28px; margin-bottom: 12px; }
        @media (min-width: 768px) { .about-icon { font-size: 32px; margin-bottom: 16px; } }

        .about-card-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
        @media (min-width: 768px) { .about-card-title { font-size: 18px; } }

        .about-card-text { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
        @media (min-width: 768px) { .about-card-text { font-size: 14px; } }

        /* ══════════════════════════════════════
           CTA CONTACT — ¿No encontrás lo que buscás?
        ══════════════════════════════════════ */
        .cta-contact-section {
          background: #0a0a0a;
          padding: 72px 0 80px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* Glow verde sutil de fondo */
        .cta-contact-section::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(37,211,102,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-contact-label {
          font-size: 11px; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
        }
        @media (min-width: 768px) { .cta-contact-label { font-size: 12px; } }

        .cta-contact-title {
          font-size: clamp(28px, 7vw, 56px);
          font-weight: 700; letter-spacing: -1.5px; line-height: 1.1;
          color: white; margin-bottom: 16px;
        }

        .cta-contact-sub {
          font-size: 15px; color: rgba(255,255,255,0.45);
          margin-bottom: 40px;
        }
        @media (min-width: 768px) { .cta-contact-sub { font-size: 17px; } }

        .btn-cta-whatsapp {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--whatsapp); color: white;
          border: none; padding: 16px 36px; border-radius: 980px;
          font-size: 16px; font-weight: 600; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          text-decoration: none; min-height: 56px;
          box-shadow: 0 0 0 0 rgba(37,211,102,0.4);
        }
        .btn-cta-whatsapp:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
          box-shadow: 0 8px 32px rgba(37,211,102,0.35);
          color: white;
        }
        .btn-cta-whatsapp:active { transform: scale(0.97); }
      `}</style>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
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
                src="https://69f636d2a0be0e562863ff1f.imgix.net/Primo/apple%20iphone%2015%20pro%20max%20black%20titanium.jpg?w=669&h=1200&fm=png&bg-remove=true&upscale=true"
                alt="iPhone 16 Pro Max"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. CARRUSEL INFINITO
      ══════════════════════════════════════════ */}
      <section className="rail-section">
        <div className="rail-section-header container">
          <div className="section-label">Catálogo completo</div>
          <div className="section-title">Lo más nuevo 🔥</div>
        </div>

        <InfiniteRail items={allProducts} onOpen={onOpenModal} />

        <div className="rail-hint container">
          Pausá pasando el cursor · Click para ver detalles
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. POPULARES (flip cards)
      ══════════════════════════════════════════ */}
      <section className="products-section">
        <div className="container">
          <div className="section-label">Más vendidos</div>
          <div className="section-title" style={{ marginBottom: 24 }}>Populares 📱</div>

          <div className="row g-3 popular-grid" style={{ overflow: 'visible' }}>
            {popular.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenModal={onOpenModal}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. ABOUT CARDS (propuesta de valor)
      ══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container">
          <div className="row g-3">
            {[
              { icon: '🚀', title: 'Entrega rápida',    text: 'Coordinamos la entrega directamente con vos para que recibas tu producto lo antes posible.' },
              { icon: '💬', title: 'Atención personal', text: 'Hablás directo con nosotros por WhatsApp. Sin bots, sin formularios, sin esperas.' },
              { icon: '📦', title: 'Envío seguro',     text: 'Empaquetamos con cuidado y enviamos por correo certificado para que tu pedido llegue intacto.' },
              { icon: '🔄', title: 'Soporte', text: 'Todos nuestros productos tienen garantía. Si tenés cualquier problema, estamos para ayudarte.' },
              { icon: '💳', title: 'Facilidades de pago', text: 'Aceptamos todas las tarjetas y ofrecemos cuotas sin interés para que puedas comprar tu iPhone sin preocupaciones.' },
              { icon: '📱', title: 'Productos originales', text: 'Vendemos solo productos Apple 100% originales, con garantía y soporte oficial. Sin clones, sin imitaciones.' },              
            ].map(card => (
              <div className="col-12 col-md-4" key={card.title}>
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

      {/* ══════════════════════════════════════════
          5. CTA CONTACTO — ¿No encontrás lo que buscás?
      ══════════════════════════════════════════ */}
      <section className="cta-contact-section">
        <div className="container" style={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
          <div className="cta-contact-label">Contacto directo</div>
          <h2 className="cta-contact-title">¿No encontrás<br />lo que buscás?</h2>
          <p className="cta-contact-sub">Escribinos y te conseguimos el equipo ideal.</p>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="btn-cta-whatsapp"
          >
            <WhatsAppIcon />
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
