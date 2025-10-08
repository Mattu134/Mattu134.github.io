// src/Pages/Dulces.jsx
import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../data';

const Dulces = () => {
  const { searchTerm } = useCart();
  const allProducts = useMemo(() => getProductsByCategory('Dulces'), []);

  
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto">
        <h1 className="fw-bold">Dulces</h1>
      </section>

      <div className="container my-5">
        <div className="row g-4 product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted col-12">No se encontraron dulces con el término "{searchTerm}".</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dulces;