// src/Pages/Dulces.jsx (Preparado para la API)

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { fetchProductsByCategory } from '../data';

const Dulces = () => {
  //  Estado para almacenar los productos de la API
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { searchTerm } = useCart();

  //  useEffect para hacer el fetch de datos
  useEffect(() => {
    // Define la función asíncrona dentro del hook
    const loadDulces = async () => {
      setLoading(true);
      try {
        // Llama a la función simulada con la categoría 'Dulces'
        const data = await fetchProductsByCategory('Dulces'); 
        setProducts(data); // Actualiza el estado con los datos simulados
      } catch (error) {
        console.error('Error al obtener dulces (simulado):', error);
         // Podrías establecer un estado de error aquí
      } finally {
        setLoading(false);
      }
    };

    loadDulces(); // Llama a la función asíncrona
  }, []); // Se ejecuta una sola vez al montar el componente

  //  Usar los productos del estado para el filtrado
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="categoria-header bg-success text-white py-4 my-4 rounded shadow-sm w-75 mx-auto">
        <h1 className="fw-bold">Dulces</h1>
      </section>

      <div className="container my-5">
        
        {loading && <p className="text-center">Cargando productos...</p>}
        
        {!loading && (
            <div className="row g-4 product-grid">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
                <p className="text-center text-muted col-12">No se encontraron dulces con el término "{searchTerm}".</p>
            )}
            </div>
        )}
      </div>
    </>
  );
};

export default Dulces;