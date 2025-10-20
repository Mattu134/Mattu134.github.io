import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { fetchProducts } from '../services/productServices';
=======
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Home = () => {
<<<<<<< HEAD
=======
  //  Estado para almacenar los productos y manejar la carga
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useCart();
  
<<<<<<< HEAD
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // El parámetro { offers: true } le indica al servicio que use el slice(0, 5)
        const data = await fetchProducts({ offers: true });
        
        setProducts(data);

=======
  //  useEffect para simular el fetch de datos desde una API
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        // Reemplaza 'URL_DE_TU_API' por la URL real de tu backend
        const response = await fetch('URL_DE_TU_API/productos?offer=true'); 
        
        let data;
        if (response.ok) {
            data = await response.json();
        } else {
             // Si no tienes API, puedes descomentar la importación de datos locales aquí
             // const { getInitialOfferProducts } = await import('../data');
             // data = getInitialOfferProducts(); 
             data = [];
        }

        setProducts(data);
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
      } catch (error) {
        console.error('Error al obtener ofertas:', error);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    loadData();
  }, []);

=======
    fetchOffers();
  }, []);

  // Filtrado de productos
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
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
                <p className="text-center text-muted col-12">No se encontraron productos en ofertas con el término "{searchTerm}".</p>
            )}
            </div>
        )}
      </section>
      
      <Contact />
    </>
  );
};

export default Home;