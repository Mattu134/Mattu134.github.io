import { initialProducts } from '../data/data';
import { v4 as uuidv4 } from 'uuid';
const API_DELAY = 300;

let productsDB = [...initialProducts];

/**
 * (READ) Simula una petición asíncrona a una API de productos.
 */
export const fetchProducts = (params = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let filteredProducts = [...productsDB]; 

        if (params.offers) {
          filteredProducts = productsDB.slice(0, 5);
        }

        if (params.category && !params.offers) {
          const requiredCategory = params.category;
          filteredProducts = productsDB.filter(
            (p) => p.category === requiredCategory
          );
        }
        
        resolve([...filteredProducts]);

      } catch (error) {
        console.error("Error simulado en fetchProducts:", error);
        reject(new Error("Error al obtener datos simulados."));
      }
    }, API_DELAY);
  });
};

/**
 * (DELETE) Simula la eliminación de un producto.
 */
export const deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = productsDB.length;
      productsDB = productsDB.filter((p) => p.id !== productId);

      if (productsDB.length < initialLength) {
        resolve({ success: true, message: 'Producto eliminado' });
      } else {
        reject(new Error('Producto no encontrado para eliminar.'));
      }
    }, API_DELAY);
  });
};

/**
 * (CREATE) Simula la creación de un nuevo producto.
 */
export const createProduct = (productData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = {
        ...productData,
        id: uuidv4(), // Asignamos un ID único
      };
      productsDB.push(newProduct);
      resolve(newProduct);
    }, API_DELAY);
  });
};

/**
 * (UPDATE) Simula la actualización de un producto.
 */
export const updateProduct = (updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = productsDB.findIndex((p) => p.id === updatedProduct.id);
      
      if (index !== -1) {
        productsDB[index] = updatedProduct; // Reemplazamos el producto
        resolve(updatedProduct);
      } else {
        reject(new Error('Producto no encontrado para actualizar.'));
      }
    }, API_DELAY);
  });
};
/**
 * (READ BY ID) Simula la búsqueda de un solo producto por su ID.
 * @param {string} productId - El ID del producto a buscar.
 */
export const fetchProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 'productsDB' debe estar definida arriba en este archivo
      const product = productsDB.find((p) => p.id === productId);
      
      if (product) {
        resolve(product); // Devuelve el producto encontrado
      } else {
        // Rechaza la promesa si no se encuentra
        reject(new Error('Producto no encontrado'));
      }
    }, API_DELAY); // API_DELAY debe estar definido arriba
  });
};
// --- FUNCIÓN SÓLO PARA TESTING ---
// Esto reinicia la base de datos en memoria a su estado original
export const resetDatabaseForTests = () => {
  // 'productsDB' e 'initialProducts' deben estar definidos arriba
  productsDB = [...initialProducts];
};