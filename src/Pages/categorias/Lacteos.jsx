import React from "react";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";

const Lacteos = () => {
  const { searchTerm } = useCart();
  const { products, loading, error } = useProducts();

  const lacteosProducts = products.filter(
    (product) =>
      product.categoria === "Lacteos" || product.category === "Lacteos"
  );

  const filteredProducts = lacteosProducts.filter((product) =>
    (product.nombre || product.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto text-center">
        <h1 className="fw-bold">Lácteos</h1>
      </section>

      <div className="container my-5">
        {loading && (
          <p className="text-center">Cargando productos lácteos...</p>
        )}

        {error && !loading && (
          <p className="text-center text-danger">
            Ocurrió un error al cargar los productos: {error}
          </p>
        )}

        {!loading && !error && (
          <div className="row g-4 product-grid justify-content-center">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No se encontraron productos lácteos con el término "
                {searchTerm}".
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Lacteos;
