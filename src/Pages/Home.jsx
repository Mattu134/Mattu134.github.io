import { useMemo } from 'react';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getInitialOfferProducts } from '../data';

const Home = () => {
  const { searchTerm } = useCart();
  const initialProducts = useMemo(() => getInitialOfferProducts(), []);

  const filteredProducts = initialProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Hero />
      <section id="ofertas" className="container my-5">
        <h2 className="text-center fw-bold text-success mb-4">Ofertas destacadas</h2>
        <div id="product-list" className="row g-4 justify-content-center product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted col-12">No se encontraron productos en ofertas con el término "{searchTerm}".</p>
          )}
        </div>
      </section>
      <Contact />
    </>
  );
};

export default Home;