// src/Pages/Dulces.jsx (Preparado para la API)

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Dulces = () => {
  //  Estado para almacenar los productos de la API
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { searchTerm } = useCart();

  //  useEffect para hacer el fetch de datos
  useEffect(() => {
    // Definimos la función asíncrona dentro del hook
    const fetchDulces = async () => {
      setLoading(true);
      try {
        // La URL de tu API real:
        const response = await fetch('URL_DE_TU_API/productos?category=dulces'); 
        const data = await response.json();
        setProducts(data); // Actualiza el estado con los datos de la API
      } catch (error) {
        console.error('Error al obtener dulces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDulces();
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