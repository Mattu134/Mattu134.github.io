// src/Pages/Frutas.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/productServices';

const Frutas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ category: 'Frutas' });
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener frutas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto text-center">
        <h1 className="fw-bold">Frutas</h1>
      </section>

      <div className="container my-5">
        {loading && <p className="text-center">Cargando frutas...</p>}

        {!loading && (
          <div className="row g-4 product-grid justify-content-center">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No se encontraron frutas con el término "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Frutas;
