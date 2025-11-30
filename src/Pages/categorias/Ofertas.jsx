import React from "react";
import ProductCard from "../../components/ProductCard";
import { useProducts } from "../../context/ProductContext";

const Ofertas = () => {
  const { products = [], loading, error } = useProducts();
  const ofertasProducts = products
    .filter((p) => p.activo) 
    .slice(0, 5);            // Tomar los primeros 5 como ofertas

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto text-center ofertas-header-anim">
        <h1 className="fw-bold mb-1">Ofertas Especiales</h1>
        <p className="mb-0">
          Ahorra más en tus compras del día a día con descuentos seleccionados.
        </p>
      </section>

      <div className="container my-5 ofertas-grid-anim">
        {loading && <p className="text-center">Cargando ofertas...</p>}

        {error && !loading && (
          <p className="text-center text-danger">
            Error al cargar ofertas: {error}
          </p>
        )}

        {!loading && !error && (
          <div className="row g-4 product-grid justify-content-center">
            {ofertasProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}

            {ofertasProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No hay ofertas disponibles por el momento.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Ofertas;
