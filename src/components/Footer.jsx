import React from 'react';

// ============================================================
// Footer — Pie de página (Mobile-First)
// ============================================================

export default function Footer() {
  return (
    <>
      <style>{`
        .istore-footer {
          background: var(--primary);
          color: rgba(255,255,255,0.6);
          padding: 32px 0;
          /* Safe area for iOS home indicator */
          padding-bottom: max(32px, env(safe-area-inset-bottom));
        }
        @media (min-width: 768px) {
          .istore-footer { padding: 40px 0; }
        }

        .footer-brand { font-size: 18px; font-weight: 700; color: white; margin-bottom: 6px; }
        @media (min-width: 768px) {
          .footer-brand { font-size: 20px; margin-bottom: 8px; }
        }

        .footer-tagline { font-size: 13px; margin-bottom: 16px; }
        @media (min-width: 768px) {
          .footer-tagline { font-size: 14px; margin-bottom: 20px; }
        }

        .footer-links { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 0; }
        @media (min-width: 768px) {
          .footer-links { justify-content: flex-end; }
        }

        .footer-link {
          color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 14px; display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.2s; min-height: 44px;
        }
        .footer-link:hover { color: white; }

        .footer-copy { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 20px; }
        @media (min-width: 768px) {
          .footer-copy { font-size: 12px; margin-top: 24px; }
        }

        .footer-row {
          display: flex; flex-direction: column; gap: 20px;
        }
        @media (min-width: 768px) {
          .footer-row { flex-direction: row; align-items: center; justify-content: space-between; gap: 0; }
        }
      `}</style>

      <footer className="istore-footer">
        <div className="container">
          <div className="footer-row">
            <div>
              <div className="footer-brand">🍎 iStore</div>
              <div className="footer-tagline">Tecnología Apple al alcance de todos.</div>
              <div className="footer-copy">© 2025 iStore · Hecho con ❤️ en Argentina</div>
            </div>
            <div className="footer-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">
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
