// src/Pages/Aseo.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/productServices';

const Aseo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ category: 'Aseo' });
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener Aseo:', error);
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
        <h1 className="fw-bold">Aseo</h1>
      </section>

      <div className="container my-5">
        {loading && <p className="text-center">Cargando productos de aseo...</p>}

        {!loading && (
          <div className="row g-4 product-grid justify-content-center">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No se encontraron productos de aseo con el término "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Aseo;
