const initialProducts = [
  // Home (Ofertas)
  { id: 'h1', name: 'Manzanas rojas', price: 2520, originalPrice: 2800, category: 'Frutas', image: 'manzanaRoja.png' },
  { id: 'h2', name: 'Pan integral', price: 2700, originalPrice: 3000, category: 'Otros', image: 'PanIntegral.png' },
  { id: 'h3', name: 'Ketchup Heinz', price: 3800, originalPrice: 4200, category: 'Otros', image: 'thumb-tomatoketchup.png' },
  { id: 'h4', name: 'Fanta 1,5L', price: 2250, originalPrice: 2500, category: 'Bebidas', image: 'fanta.jpg' },
  { id: 'h5', name: 'Jugo de naranja', price: 1620, originalPrice: 1800, category: 'Bebidas', image: 'JuegoNaranja.jpg' },

  // Frutas
  { id: 'f1', name: 'Naranjas jugosas', price: 2550, originalPrice: 3000, category: 'Frutas', image: 'naranja.png' },
  { id: 'f2', name: 'Bananas', price: 2250, originalPrice: 2500, category: 'Frutas', image: 'banana.png' }, // Corregí nombre imagen si existe
  { id: 'f3', name: 'Kiwis', price: 3040, originalPrice: 3200, category: 'Frutas', image: 'Kiwi.png' },
  { id: 'f4', name: 'Uvas verdes', price: 2700, originalPrice: 3000, category: 'Frutas', image: 'Uva.png' },

  // Dulces
  { id: 'd1', name: 'Chocolate', price: 3150, originalPrice: 3500, category: 'Dulces', image: 'Chocolate.webp' },
  { id: 'd2', name: 'Frugele', price: 1710, originalPrice: 1800, category: 'Dulces', image: 'frugele.webp' },
  { id: 'd3', name: 'Galletas de mantequilla', price: 2024, originalPrice: 2200, category: 'Dulces', image: 'VinoGalleta.avif' },
  { id: 'd4', name: 'Bombones premium', price: 3520, originalPrice: 4000, category: 'Dulces', image: 'bombones.webp' },
  { id: 'd5', name: 'Chicles sabor menta', price: 950, originalPrice: 1000, category: 'Dulces', image: 'Orbit.webp' },
];

// Simula la latencia de red
const networkDelay = 500; // 0.5 segundos

// Función para obtener TODOS los productos (útil para el admin)
export const getAllProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...initialProducts]); // Devuelve una copia para evitar mutaciones
    }, networkDelay);
  });
};

// Función para obtener productos POR CATEGORÍA
export const fetchProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredProducts = initialProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
      if (filteredProducts.length > 0) {
        resolve([...filteredProducts]); // Devuelve una copia
      } else {
        // Simula un "no encontrado" aunque aquí siempre encontraremos
        resolve([]); 
      }
    }, networkDelay);
  });
};

// Función para obtener las OFERTAS (productos donde price < originalPrice)
export const fetchOfferProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filtra productos en oferta O simplemente toma los primeros 5 como antes
      // const offers = initialProducts.filter(p => p.price < p.originalPrice);
      const offers = initialProducts.slice(0, 5); // Mantenemos la lógica original de Home
      resolve([...offers]); // Devuelve una copia
    }, networkDelay);
  });
};

// --- Funciones CRUD (Simuladas - para el Admin Panel) ---

// Crear un nuevo producto (simulado)
export const createProduct = (newProductData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = { 
        ...newProductData, 
        id: `new_${Date.now()}`, // Genera un ID simple
        // Asegúrate de que los precios sean números si vienen como string del form
        price: parseFloat(newProductData.price) || 0,
        originalPrice: parseFloat(newProductData.originalPrice) || parseFloat(newProductData.price) || 0,
      };
      initialProducts.push(newProduct); // ¡Ojo! Modifica el array original
      console.log('Producto añadido (simulado):', newProduct);
      resolve(newProduct); // Devuelve el producto creado
    }, networkDelay);
  });
};

// Actualizar un producto (simulado)
export const updateProduct = (productId, updatedProductData) => {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productIndex = initialProducts.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        // Actualiza el producto en el array
        initialProducts[productIndex] = { 
          ...initialProducts[productIndex], 
          ...updatedProductData,
           // Asegúrate de que los precios sean números
          price: parseFloat(updatedProductData.price) || 0,
          originalPrice: parseFloat(updatedProductData.originalPrice) || parseFloat(updatedProductData.price) || 0,
        }; 
        console.log('Producto actualizado (simulado):', initialProducts[productIndex]);
        resolve(initialProducts[productIndex]); // Devuelve el producto actualizado
      } else {
        console.error('Producto no encontrado para actualizar (simulado):', productId);
        reject(new Error('Producto no encontrado'));
      }
    }, networkDelay);
  });
};

// Eliminar un producto (simulado)
export const deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = initialProducts.length;
      const productIndex = initialProducts.findIndex(p => p.id === productId);
      
      if (productIndex !== -1) {
         initialProducts.splice(productIndex, 1); // ¡Ojo! Modifica el array original
         console.log('Producto eliminado (simulado):', productId);
         resolve({ message: 'Producto eliminado exitosamente' }); 
      } else {
         console.error('Producto no encontrado para eliminar (simulado):', productId);
         reject(new Error('Producto no encontrado'));
      }
    }, networkDelay);
  });
};