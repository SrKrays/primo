import React, { useState } from 'react';
import '../styles/global.css';

import Navbar         from './Navbar';
import Footer         from './Footer';
import HomePage       from './HomePage';
import ProductsPage   from './ProductsPage';
import NosotrosPage   from './NosotrosPage';
import ProductModal   from './ProductModal';
import CartDrawer     from './CartDrawer';
import CheckoutModal  from './CheckoutModal';

import { products } from '../data/products';
import { useCart }  from '../hooks/useCart';

// ============================================================
// Configuración de filtros por sección
// ============================================================
const FILTER_CONFIG = {
  iphones: [
    {
      key: 'serie',
      label: 'Serie',
      options: ['Todos', 'iPhone 16', 'iPhone 15', 'iPhone 14'],
    },
    {
      key: 'storage',
      label: 'Storage',
      options: ['Todos', '128GB', '256GB', '512GB'],
    },
  ],
  airpods: [
    {
      key: 'tipo',
      label: 'Tipo',
      options: ['Todos', 'AirPods', 'AirPods Pro', 'AirPods Max'],
    },
  ],
  cargadores: [
    {
      key: 'tipo',
      label: 'Tipo',
      options: ['Todos', 'MagSafe', 'USB-C', 'Cable'],
    },
  ],
};

// ============================================================
// App — Componente raíz
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen,    setCartOpen]     = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [modal, setModal] = useState(null); // { product, storage }

  const { cart, addToCart, removeFromCart, changeQty, totalItems } = useCart();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const openModal = (product, storage) => {
    setModal({ product, storage });
  };

  const closeModal = () => setModal(null);

  const handleAddFromModal = (product, storage) => {
    addToCart(product, storage);
    closeModal();
  };

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      {/* ── Navbar fija ── */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        totalItems={totalItems}
        onCartToggle={() => setCartOpen(prev => !prev)}
      />

      {/* ── Páginas ── */}
      <main>
        {currentPage === 'home' && (
          <HomePage onNavigate={navigate} onOpenModal={openModal} />
        )}
        {currentPage === 'iphones' && (
          <ProductsPage
            title="iPhone"
            items={products.iphones}
            filterConfig={FILTER_CONFIG.iphones}
            onOpenModal={openModal}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'airpods' && (
          <ProductsPage
            title="AirPods"
            items={products.airpods}
            filterConfig={FILTER_CONFIG.airpods}
            onOpenModal={openModal}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'cargadores' && (
          <ProductsPage
            title="Cargadores & Accesorios"
            items={products.cargadores}
            filterConfig={FILTER_CONFIG.cargadores}
            onOpenModal={openModal}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'nosotros' && <NosotrosPage />}
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Overlays / Modales ── */}
      <CartDrawer
        isOpen={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        onCheckout={openCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        cart={cart}
        onClose={() => setCheckoutOpen(false)}
      />

      {modal && (
        <ProductModal
          product={modal.product}
          initialStorage={modal.storage}
          onClose={closeModal}
          onAddToCart={handleAddFromModal}
        />
      )}
    </>
  );
}
