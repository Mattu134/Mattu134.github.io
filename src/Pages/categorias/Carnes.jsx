import React from "react";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";

const Carnes = () => {
  const { searchTerm } = useCart();
  const { products = [], loading, error } = useProducts();
  const carnesProducts = products.filter(
    (p) =>
      p.category?.toLowerCase() === "carnes" ||
      p.categoria?.toLowerCase() === "carnes"
  );

  const filteredProducts = carnesProducts.filter((p) =>
    (p.name || p.nombre || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto text-center">
        <h1 className="fw-bold">Carnes</h1>
      </section>

      <div className="container my-5">
        {loading && <p className="text-center">Cargando carnes...</p>}

        {error && !loading && (
          <p className="text-center text-danger">
            Ocurrió un error al cargar los productos: {error}
          </p>
        )}

        {!loading && !error && (
          <div className="row g-4 product-grid justify-content-center">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id || p._id} product={p} />
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No se encontraron carnes con el término "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Carnes;
