import React from "react";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import ProductCard from "../components/ProductCard";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { products, loading, error } = useProducts();
  const { searchTerm } = useCart();
  const normalizedSearch = (searchTerm || "").trim().toLowerCase();
  const activeProducts = products.filter((p) => p.activo);
  // Destacados: primeros 8 activos
  const featuredProducts = activeProducts.slice(0, 8);
  const filteredProducts = featuredProducts.filter((product) => {
    const name = (product.nombre || product.name || "").toLowerCase();
    return !normalizedSearch || name.includes(normalizedSearch);
  });

  return (
    <>
      <Hero />

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
