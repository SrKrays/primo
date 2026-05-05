import React, { useState } from 'react';
import ProductCard from './ProductCard';

// ============================================================
// ProductsPage — Catálogo con filtros (Mobile-First)
// Filtros colapsables en mobile, sidebar en desktop
// ============================================================

export default function ProductsPage({ title, items, filterConfig, onOpenModal, onAddToCart }) {
  const initialFilters = {};
  filterConfig.forEach(f => { initialFilters[f.key] = 'Todos'; });
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile toggle

  const setFilter = (key, val) => {
    setActiveFilters(prev => ({ ...prev, [key]: val }));
  };

  const filtered = items.filter(p => {
    return filterConfig.every(f => {
      const val = activeFilters[f.key];
      if (val === 'Todos') return true;
      if (f.key === 'storage') return p.storage && p.storage.includes(val);
      return p[f.key] === val;
    });
  });

  const activeFilterCount = Object.values(activeFilters).filter(v => v !== 'Todos').length;

  return (
    <>
      <style>{`
        .products-page { padding-top: var(--nav-height); }
        .products-section { padding: 24px 0 48px; }
        @media (min-width: 768px) {
          .products-section { padding: 40px 0 60px; }
        }

        /* ── Mobile filter bar ── */
        .mobile-filter-bar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px;
        }
        @media (min-width: 992px) {
          .mobile-filter-bar { display: none; }
        }

        .btn-filter-toggle {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 20px;
          border: 1.5px solid var(--border); background: white;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.2s; min-height: 40px;
        }
        .btn-filter-toggle.has-filters {
          border-color: var(--accent); color: var(--accent);
        }
        .filter-badge {
          background: var(--accent); color: white;
          font-size: 11px; font-weight: 700;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Mobile filter panel ── */
        .mobile-filter-panel {
          background: var(--silver); border-radius: 16px;
          padding: 0; margin-bottom: 16px;
          max-height: 0; overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .mobile-filter-panel.open {
          max-height: 600px;
          padding: 16px;
        }
        @media (min-width: 992px) {
          .mobile-filter-panel { display: none; }
        }

        /* ── Desktop sidebar ── */
        .filter-sidebar {
          display: none;
          background: var(--silver); border-radius: 16px; padding: 24px;
          position: sticky; top: calc(var(--nav-height) + 16px);
        }
        @media (min-width: 992px) {
          .filter-sidebar { display: block; }
        }

        .filter-title { font-size: 15px; font-weight: 600; margin-bottom: 14px; }
        @media (min-width: 992px) {
          .filter-title { font-size: 16px; margin-bottom: 16px; }
        }

        .filter-group { margin-bottom: 18px; }
        @media (min-width: 992px) {
          .filter-group { margin-bottom: 20px; }
        }

        .filter-group-label {
          font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;
        }
        @media (min-width: 992px) {
          .filter-group-label { font-size: 11px; }
        }

        .filter-chip {
          display: inline-block; padding: 5px 12px;
          border-radius: 20px; font-size: 12px; font-weight: 400;
          border: 1px solid var(--border); background: white;
          cursor: pointer; margin: 3px; transition: all 0.2s; min-height: 32px;
        }
        @media (min-width: 992px) {
          .filter-chip { padding: 6px 14px; font-size: 13px; }
        }
        .filter-chip:hover, .filter-chip.active {
          background: var(--primary); color: white; border-color: var(--primary);
        }

        /* ── Products header ── */
        .products-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px;
        }
        @media (min-width: 768px) {
          .products-header { margin-bottom: 24px; }
        }

        .products-count { font-size: 12px; color: var(--text-muted); }
        @media (min-width: 768px) {
          .products-count { font-size: 13px; }
        }

        .section-title {
          font-size: 24px; font-weight: 700; letter-spacing: -0.8px;
        }
        @media (min-width: 768px) {
          .section-title { font-size: 32px; letter-spacing: -1px; }
        }

        /* ── Empty state ── */
        .empty-state {
          text-align: center; padding: 60px 20px; color: var(--text-muted);
        }
        .empty-state-icon { font-size: 48px; margin-bottom: 16px; }
      `}</style>

      <div className="products-page">
        <div className="products-section">
          <div className="container">

            {/* Mobile filter bar */}
            <div className="mobile-filter-bar">
              <button
                className={`btn-filter-toggle${activeFilterCount > 0 ? ' has-filters' : ''}`}
                onClick={() => setFiltersOpen(prev => !prev)}
              >
                ⚙️ Filtros
                {activeFilterCount > 0 && (
                  <span className="filter-badge">{activeFilterCount}</span>
                )}
                <span style={{ fontSize: 12, opacity: 0.5 }}>{filtersOpen ? '▲' : '▼'}</span>
              </button>
              <div className="products-count">
                {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Mobile filter panel */}
            <div className={`mobile-filter-panel${filtersOpen ? ' open' : ''}`}>
              <div className="filter-title">Filtros</div>
              {filterConfig.map(f => (
                <div className="filter-group" key={f.key}>
                  <div className="filter-group-label">{f.label}</div>
                  {f.options.map(opt => (
                    <span
                      key={opt}
                      className={`filter-chip${activeFilters[f.key] === opt ? ' active' : ''}`}
                      onClick={() => setFilter(f.key, opt)}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="row g-3 g-lg-4">
              {/* Desktop sidebar */}
              <div className="col-lg-3 d-none d-lg-block">
                <div className="filter-sidebar">
                  <div className="filter-title">Filtros</div>
                  {filterConfig.map(f => (
                    <div className="filter-group" key={f.key}>
                      <div className="filter-group-label">{f.label}</div>
                      {f.options.map(opt => (
                        <span
                          key={opt}
                          className={`filter-chip${activeFilters[f.key] === opt ? ' active' : ''}`}
                          onClick={() => setFilter(f.key, opt)}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid de productos */}
              <div className="col-12 col-lg-9">
                <div className="products-header d-none d-lg-flex">
                  <div className="section-title">{title}</div>
                  <div className="products-count">
                    {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <p>No hay productos con estos filtros</p>
                  </div>
                ) : (
                  <div className="row g-2 g-sm-3">
                    {filtered.map(p => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onOpenModal={onOpenModal}
                        onAddToCart={onAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
