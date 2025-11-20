import axios from "axios";

const API_DELAY = 400;

/**
 * @param {object} params
 *  - offers: boolean => si es true, devuelve solo las primeras ofertas
 *  - category: string => nombre exacto de la categoría (ej: "Frutas", "Carnes")
 */
export const fetchProducts = async (params = {}) => {
  try {
    const response = await axios.get("/data/data.json");
    let products = response.data.products || [];

    if (params.offers) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(products.slice(0, 5)), API_DELAY)
      );
    }

    if (params.category) {
      const categoryLower = params.category.toLowerCase();
      products = products.filter(
        (p) => p.category.toLowerCase() === categoryLower
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(products), API_DELAY)
    );
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
};
