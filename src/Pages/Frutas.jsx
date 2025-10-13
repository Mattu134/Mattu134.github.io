import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Frutas = () => {
  //  Estado para almacenar los productos y manejar la carga
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { searchTerm } = useCart();

  // useEffect para simular el fetch de datos desde una API
  useEffect(() => {
    const fetchFrutas = async () => {
      setLoading(true);
      try {
        //Reemplaza 'URL_DE_TU_API' por la URL real de tu backend
        const response = await fetch('URL_DE_TU_API/productos?category=frutas'); 
        
        // Simulación de respuesta de API (usar datos locales si el fetch falla)
        let data;
        if (response.ok) {
            data = await response.json();
        } else {
             // 💡 Si no tienes API, puedes descomentar la importación de datos locales aquí
             // const { getProductsByCategory } = await import('../data');
             // data = getProductsByCategory('Frutas'); 
             data = []; // O dejar vacío para que muestre el mensaje de no encontrado
        }

        setProducts(data);
      } catch (error) {
        console.error('Error al obtener frutas:', error);
        // Si hay un error, puedes establecer un estado de error
      } finally {
        setLoading(false);
      }
    };

    fetchFrutas();
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