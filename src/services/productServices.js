import { initialProducts } from '../data/data';

const API_DELAY = 500;

/**
 * Simula una petición asíncrona a una API de productos con filtros.
 * llamada Axios/Fetch.
 * @param {object} params - Parámetros de filtro.
 * @param {boolean} [params.offers] - Si es true, devuelve solo los 5 primeros productos (ofertas).
 * @param {string} [params.category] - Filtra por el nombre de la categoría (ej: 'Frutas', 'Dulces').
 * @returns {Promise<Array>} Una Promesa que resuelve a la lista de productos filtrados.
 */
export const fetchProducts = (params = {}) => {
  return new Promise((resolve, reject) => {
    
    //  Simula el tiempo de espera de la API
    setTimeout(() => {
      let filteredProducts = initialProducts;
      
      try {
          if (params.offers) {
              filteredProducts = initialProducts.slice(0, 5); 
          }
          
          // Se ejecuta solo si NO estamos pidiendo las ofertas
          if (params.category && !params.offers) {
            const requiredCategory = params.category;
            
            filteredProducts = initialProducts.filter(p => p.category === requiredCategory);
          }

          // 3. Resuelve la promesa con el resultado
          resolve(filteredProducts);
          
      } catch (error) {
          // Esto es solo para simulación. En una API real, aquí capturarías un error de red.
          console.error("Error simulado en el servicio:", error);
          reject(new Error("Error al obtener datos simulados."));
      }
      
    }, API_DELAY);
  });
};