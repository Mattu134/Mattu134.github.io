import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import ProductCard from "../components/ProductCard";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { products, loading, error } = useProducts();
  const { searchTerm, cart } = useCart();

  const [showAddedMsg, setShowAddedMsg] = useState(false);
  const prevCartCount = useRef(cart.length);

  const normalizedSearch = (searchTerm || "").trim().toLowerCase();
  const activeProducts = products.filter((p) => p.activo);
  const featuredProducts = activeProducts.slice(0, 8);

  const filteredProducts = featuredProducts.filter((product) => {
    const name = (product.nombre || product.name || "").toLowerCase();
    return !normalizedSearch || name.includes(normalizedSearch);
  });

  useEffect(() => {
    if (cart.length > prevCartCount.current) {
      setShowAddedMsg(true);

      const timer = setTimeout(() => {
        setShowAddedMsg(false);
      }, 2200);

      return () => clearTimeout(timer);
    }

    prevCartCount.current = cart.length;
  }, [cart.length]);

  useEffect(() => {
    prevCartCount.current = cart.length;
  }, []);

  return (
    <>
      <Hero />
      {showAddedMsg && (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 2000 }}
        >
          <div className="alert alert-success text-center shadow-lg px-4 py-3">
            <i className="bi bi-check-circle-fill me-2"></i>
            Producto agregado al carrito con éxito
          </div>
        </div>
      )}

      <section id="destacados" className="container my-5">
        <h2 className="text-center fw-bold text-success mb-4">
          Productos destacados
        </h2>

        {loading && <p className="text-center">Cargando productos...</p>}

        {error && !loading && (
          <p className="text-center text-danger">
            Ocurrió un error al cargar los productos: {error}
          </p>
        )}

        {!loading && !error && (
          <div
            id="product-list"
            className="row g-4 justify-content-center product-grid"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No hay productos destacados que coincidan con "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </section>

      <Contact />
    </>
  );
};

export default Home;
