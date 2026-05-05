import React from 'react';

// ============================================================
// Footer — Pie de página
// ============================================================

export default function Footer() {
  return (
    <>
      <style>{`
        .istore-footer {
          background: var(--primary);
          color: rgba(255,255,255,0.6);
          padding: 40px 0;
        }
        .footer-brand { font-size: 20px; font-weight: 700; color: white; margin-bottom: 8px; }
        .footer-tagline { font-size: 14px; margin-bottom: 20px; }
        .footer-link {
          color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 14px; display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: white; }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 24px; }
      `}</style>

      <footer className="istore-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="footer-brand">🍎 iStore</div>
              <div className="footer-tagline">Tecnología Apple al alcance de todos.</div>
              <div className="footer-copy">© 2025 iStore · Hecho con ❤️ en Argentina</div>
            </div>
            <div className="col-md-6 text-md-end mt-4 mt-md-0">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link me-3">
                📸 Instagram
              </a>
              <a href="https://wa.me/5493510000000" target="_blank" rel="noreferrer" className="footer-link">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
