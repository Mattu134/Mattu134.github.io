import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productServices';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ offers: true });
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener ofertas:', error);
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
      <Hero />

      <section id="ofertas" className="container my-5">
        <h2 className="text-center fw-bold text-success mb-4">Ofertas destacadas</h2>

        {loading && <p className="text-center">Cargando ofertas...</p>}

        {!loading && (
          <div id="product-list" className="row g-4 justify-content-center product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted col-12">
                No se encontraron productos en ofertas con el término "{searchTerm}".
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
