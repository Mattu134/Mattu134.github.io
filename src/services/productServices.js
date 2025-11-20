import axios from "axios";

const API_DELAY = 400;

export const fetchProducts = async (params = {}) => {
  try {
    const response = await axios.get("/data/data.json");

    let products = response.data.products;

    // Ofertas (primeros 5)
    if (params.offers) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(products.slice(0, 5)), API_DELAY)
      );
    }

    // Filtrar por categoría
    if (params.category) {
      const categoryLower = params.category.toLowerCase();
      products = products.filter(
        (p) => p.category.toLowerCase() === categoryLower
      );
    }

    // Retornar todos los productos
    return new Promise((resolve) =>
      setTimeout(() => resolve(products), API_DELAY)
    );
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
};
