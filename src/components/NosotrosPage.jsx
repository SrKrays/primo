import React from 'react';

// ============================================================
// NosotrosPage — Página "Quiénes Somos"
// ============================================================

export default function NosotrosPage() {
  return (
    <>
      <style>{`
        .nosotros-page {
          padding-top: var(--nav-height);
        }
        .about-section {
          background: var(--silver);
          padding: 80px 0;
          min-height: 60vh;
        }
        .section-label {
          font-size: 13px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;
        }
        .section-title { font-size: 32px; font-weight: 700; letter-spacing: -1px; margin-bottom: 24px; }
        .btn-hero {
          background: var(--accent); color: white;
          border: none; padding: 14px 32px;
          border-radius: 980px; font-size: 15px; font-weight: 500;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: transform 0.2s, background 0.2s;
        }
        .btn-hero:hover { background: var(--accent-hover); transform: scale(1.03); color: white; }
      `}</style>

      <div className="nosotros-page">
        <section className="about-section">
          <div className="container" style={{ maxWidth: 640 }}>
            <div className="section-label">Sobre nosotros</div>
            <h2 className="section-title">¿Quiénes somos?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 24 }}>
              Somos un equipo apasionado por la tecnología Apple. Nuestro objetivo es acercar los mejores
              productos al mejor precio, con atención personalizada y confianza garantizada.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 32 }}>
              Cada venta es directa: hablás con nosotros, coordinamos entrega, y te acompañamos en todo
              el proceso. Sin intermediarios raros ni tiendas impersonales.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn-hero"
            >
              📸 Seguinos en Instagram
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
