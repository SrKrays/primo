import React from 'react';

// ============================================================
// NosotrosPage — Página "Quiénes Somos" (Mobile-First)
// ============================================================

export default function NosotrosPage() {
  return (
    <>
      <style>{`
        .nosotros-page {
          padding-top: var(--nav-height);
        }
        .nosotros-about-section {
          background: var(--silver);
          padding: 48px 0;
          min-height: 60vh;
        }
        @media (min-width: 768px) {
          .nosotros-about-section { padding: 80px 0; }
        }

        .nosotros-label {
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;
        }
        @media (min-width: 768px) {
          .nosotros-label { font-size: 13px; }
        }

        .nosotros-title { font-size: 26px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 20px; }
        @media (min-width: 768px) {
          .nosotros-title { font-size: 32px; letter-spacing: -1px; margin-bottom: 24px; }
        }

        .nosotros-text {
          font-size: 15px; line-height: 1.8; color: var(--text-muted); margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .nosotros-text { font-size: 17px; margin-bottom: 24px; }
        }

        .btn-nosotros {
          background: var(--accent); color: white;
          border: none; padding: 12px 24px;
          border-radius: 980px; font-size: 14px; font-weight: 500;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: transform 0.2s, background 0.2s;
          min-height: 46px; display: inline-flex; align-items: center;
        }
        @media (min-width: 768px) {
          .btn-nosotros { padding: 14px 32px; font-size: 15px; }
        }
        .btn-nosotros:hover { background: var(--accent-hover); transform: scale(1.03); color: white; }
        .btn-nosotros:active { transform: scale(0.97); }
      `}</style>

      <div className="nosotros-page">
        <section className="nosotros-about-section">
          <div className="container" style={{ maxWidth: 680 }}>
            <div className="nosotros-label">Sobre nosotros</div>
            <h2 className="nosotros-title">¿Quiénes somos?</h2>
            <p className="nosotros-text">
              Somos un equipo apasionado por la tecnología Apple. Nuestro objetivo es acercar los mejores
              productos al mejor precio, con atención personalizada y confianza garantizada.
            </p>
            <p className="nosotros-text" style={{ marginBottom: 28 }}>
              Cada venta es directa: hablás con nosotros, coordinamos entrega, y te acompañamos en todo
              el proceso. Sin intermediarios raros ni tiendas impersonales.
            </p>
            <a
              href="https://www.instagram.com/maxigiimenezz/"
              target="_blank"
              rel="noreferrer"
              className="btn-nosotros"
            >
              📸 Seguinos en Instagram
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
