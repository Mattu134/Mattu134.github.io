import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productServices";

const Ofertas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts({ offers: true });
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto text-center ofertas-header-anim">
        <h1 className="fw-bold mb-1">Ofertas Especiales</h1>
        <p className="mb-0">
          Ahorra más en tus compras del día a día con descuentos seleccionados.
        </p>
      </section>

      <div className="container my-5 ofertas-grid-anim">
        {loading ? (
          <p className="text-center">Cargando ofertas...</p>
        ) : (
          <div className="row g-4 product-grid justify-content-center">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}

            {products.length === 0 && (
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
