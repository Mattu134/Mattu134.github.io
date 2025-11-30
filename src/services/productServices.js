import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
const api = axios.create({
  baseURL: API_BASE_URL,
});
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get("/products");
    let products = response.data;

    if (params.offers) {
      products = products.slice(0, 5);
    }
    if (params.category && !params.offers) {
      const requiredCategory = params.category;
      products = products.filter(
        (p) =>
          p.category === requiredCategory || p.categoria === requiredCategory
      );
    }

    return products;
  } catch (error) {
    console.error("Error al obtener productos desde la API:", error);
    throw new Error("Error al obtener productos desde el servidor.");
  }
};

/**Obtiene un producto por ID desde la API.*/
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw new Error("Producto no encontrado");
  }
};

/**Crea un nuevo producto en la API.*/
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("No se pudo crear el producto.");
  }
};

/**Actualiza un producto en la API.*/
export const updateProduct = async (updatedProduct) => {
  try {
    if (!updatedProduct.id) {
      throw new Error("El producto no tiene ID para actualizar.");
    }

    const response = await api.put(
      `/products/${updatedProduct.id}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw new Error("No se pudo actualizar el producto.");
  }
};

/**Elimina un producto en la API. */
export const deleteProduct = async (productId) => {
  try {
    await api.delete(`/products/${productId}`);
    return { success: true, message: "Producto eliminado" };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error("No se pudo eliminar el producto.");
  }
};

