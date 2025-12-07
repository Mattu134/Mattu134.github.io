import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No se encontró el token en localStorage para API protegida.");
  }
  return config;
});

export const fetchProducts = async (params = {}) => {
  try {
    const response = await publicApi.get("/products");
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
    if (error.response && error.response.status === 403) {
      console.error("Acceso denegado: Error 403.");
      throw new Error("No tiene permisos para acceder a los productos.");
    }
    console.error("Error al obtener productos desde la API:", error);
    throw new Error("Error al obtener productos desde el servidor.");
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await publicApi.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw new Error("Producto no encontrado");
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("No se pudo crear el producto.");
  }
};

export const updateProduct = async (updatedProduct) => {
  try {
    if (!updatedProduct.id) {
      throw new Error("El producto no tiene ID para actualizar.");
    }

    const response = await publicApi.put(
      `/products/${updatedProduct.id}`,
      updatedProduct
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw new Error("No se pudo actualizar el producto.");
  }
};


export const deleteProduct = async (productId) => {
  try {
    await api.delete(`/products/${productId}`);
    return { success: true, message: "Producto eliminado" };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error("No se pudo eliminar el producto.");
  }
};
