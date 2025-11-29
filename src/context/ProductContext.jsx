  import { createContext, useContext, useEffect, useState, useCallback } from "react";
  import { fetchProducts } from "../services/productServices";


  const ProductContext = createContext();

  export const useProducts = () => useContext(ProductContext);

  export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts(); // llama a la API
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      loadProducts();
    }, [loadProducts]);

    const value = {
      products,
      loading,
      error,
      refreshProducts: loadProducts,
    };

    return (
      <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    );
  };
