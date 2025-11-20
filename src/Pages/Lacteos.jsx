import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/productServices";

const Lacteos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts({ category: "Lacteos" });
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto text-center">
        <h1 className="fw-bold">Lacteos</h1>
      </section>

      <div className="container my-5">
        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <div className="row g-4 product-grid justify-content-center">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No se encontraron resultados para "{searchTerm}"
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Lacteos;
