import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { fetchProductsByCategory } from '../data';

const Frutas = () => {
  //  Estado para almacenar los productos y manejar la carga
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { searchTerm } = useCart();

  // useEffect para simular el fetch de datos desde una API
  useEffect(() => {
    // Define la función asíncrona dentro del hook
    const loadFrutas = async () => {
      setLoading(true);
      try {
        // Llama a la función simulada con la categoría 'Frutas'
        const data = await fetchProductsByCategory('Frutas'); 
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener frutas (simulado):', error);
        // Podrías establecer un estado de error aquí
      } finally {
        setLoading(false);
      }
    };

    loadFrutas(); // Llama a la función asíncrona
  }, []); // El array vacío asegura que se ejecute una sola vez al montar

  // 3. Filtrado de productos (funciona igual, ahora sobre el estado)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto">
        <h1 className="fw-bold">Frutas</h1>
      </section>

      <div className="container my-5">
        {loading && <p className="text-center">Cargando frutas...</p>}
        
        {!loading && (
            <div className="row g-4 product-grid">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
                <p className="text-center text-muted col-12">No se encontraron frutas con el término "{searchTerm}".</p>
            )}
            </div>
        )}
      </div>
    </>
  );
};

export default Frutas;