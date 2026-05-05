import React from 'react';

// ============================================================
// Navbar — Barra de navegación fija con ícono del carrito
// ============================================================

const AppleLogo = () => (
  <svg viewBox="0 0 814 1000" fill="currentColor" width="20" height="20">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663.8 0 541.2c0-207.1 131.7-316.9 261.8-316.9 63.8 0 117.6 42 156.3 42 37.1 0 97.3-44.6 167.7-44.6 27 0 108.2 2.6 168.9 100.8zm-234.5-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const NAV_LINKS = [
  { id: 'home',       label: 'Inicio' },
  { id: 'iphones',    label: 'iPhone' },
  { id: 'airpods',    label: 'AirPods' },
  { id: 'cargadores', label: 'Cargadores' },
  { id: 'nosotros',   label: 'Quiénes Somos' },
];

export default function Navbar({ currentPage, onNavigate, totalItems, onCartToggle }) {
  return (
    <>
      <style>{`
        .istore-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-height);
          background: rgba(255,255,255,0.85);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 0.5px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px;
        }
        .nav-logo {
          font-size: 20px; font-weight: 600; letter-spacing: -0.5px;
          color: var(--primary); text-decoration: none;
          display: flex; align-items: center; gap: 6px;
          cursor: pointer; background: none; border: none;
        }
        .nav-links { display: flex; gap: 0; list-style: none; }
        .nav-links a {
          color: var(--primary); text-decoration: none;
          font-size: 13px; font-weight: 400;
          padding: 8px 14px; border-radius: 20px;
          transition: background 0.2s, color 0.2s;
          cursor: pointer; display: block;
        }
        .nav-links a:hover,
        .nav-links a.active { background: var(--silver); }
        .nav-cart {
          position: relative; cursor: pointer;
          background: none; border: none;
          padding: 8px; border-radius: 50%;
          transition: background 0.2s;
        }
        .nav-cart:hover { background: var(--silver); }
        .cart-badge {
          position: absolute; top: 2px; right: 2px;
          background: var(--accent); color: white;
          font-size: 10px; font-weight: 600;
          width: 16px; height: 16px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
        }
      `}</style>

      <nav className="istore-nav">
        <button className="nav-logo" onClick={() => onNavigate('home')}>
          <AppleLogo />
          iStore
        </button>

        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a
                className={currentPage === link.id ? 'active' : ''}
                onClick={() => onNavigate(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="nav-cart" onClick={onCartToggle}>
          <CartIcon />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </nav>
    </>
  );
}
