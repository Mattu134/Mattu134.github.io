import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../data';

const Frutas = () => {
  const { searchTerm } = useCart();
  const allProducts = useMemo(() => getProductsByCategory('Frutas'), []);

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto">
        <h1 className="fw-bold">Frutas</h1>
      </section>

      <div className="container my-5">
        <div className="row g-4 product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted col-12">No se encontraron frutas con el término "{searchTerm}".</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Frutas;