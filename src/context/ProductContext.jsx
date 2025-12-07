import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { fetchProducts } from "../services/productServices";

const ProductContext = createContext(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
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

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      refreshProducts: loadProducts,
    }),
    [products, loading, error, loadProducts]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
