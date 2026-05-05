import React, { useState } from 'react';
import ProductCard from './ProductCard';

// ============================================================
// ProductsPage — Página de catálogo con filtros laterales
// Props:
//   section   : 'iphones' | 'airpods' | 'cargadores'
//   title     : string mostrado en el header
//   items     : array de productos de esa categoría
//   filters   : array de { key, label, options: ['Todos', ...] }
//   onOpenModal, onAddToCart
// ============================================================

export default function ProductsPage({ title, items, filterConfig, onOpenModal, onAddToCart }) {
  // Estado de filtros: { [key]: 'Todos' | valor }
  const initialFilters = {};
  filterConfig.forEach(f => { initialFilters[f.key] = 'Todos'; });
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const setFilter = (key, val) => {
    setActiveFilters(prev => ({ ...prev, [key]: val }));
  };

  // Aplicar filtros
  const filtered = items.filter(p => {
    return filterConfig.every(f => {
      const val = activeFilters[f.key];
      if (val === 'Todos') return true;
      if (f.key === 'storage') return p.storage && p.storage.includes(val);
      return p[f.key] === val;
    });
  });

  return (
    <>
      <style>{`
        .products-page { padding-top: var(--nav-height); }
        .products-section { padding: 60px 0; }
        .filter-sidebar {
          background: var(--silver); border-radius: 16px; padding: 24px;
          position: sticky; top: calc(var(--nav-height) + 16px);
        }
        .filter-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }
        .filter-group { margin-bottom: 20px; }
        .filter-group-label {
          font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;
        }
        .filter-chip {
          display: inline-block; padding: 6px 14px;
          border-radius: 20px; font-size: 13px; font-weight: 400;
          border: 1px solid var(--border); background: white;
          cursor: pointer; margin: 3px; transition: all 0.2s;
        }
        .filter-chip:hover, .filter-chip.active {
          background: var(--primary); color: white; border-color: var(--primary);
        }
        .products-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
        }
        .products-count { font-size: 13px; color: var(--text-muted); }
        .section-title { font-size: 32px; font-weight: 700; letter-spacing: -1px; }
      `}</style>

      <div className="products-page">
        <div className="products-section">
          <div className="container">
            <div className="row g-4">

              {/* ── Sidebar de filtros ── */}
              <div className="col-lg-3">
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

              {/* ── Grid de productos ── */}
              <div className="col-lg-9">
                <div className="products-header">
                  <div className="section-title" style={{ marginBottom: 0 }}>{title}</div>
                  <div className="products-count">
                    {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="row g-3">
                  {filtered.map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenModal={onOpenModal}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
