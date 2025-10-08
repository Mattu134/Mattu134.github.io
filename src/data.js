// src/data.js

// Lista completa de productos (extraída de index.html, dulces.html, Frutas.html)
export const initialProducts = [
  // Home (Ofertas)
  { id: 'h1', name: 'Manzanas rojas', price: 2520, originalPrice: 2800, category: 'Frutas', image: 'manzanaRoja.png' },
  { id: 'h2', name: 'Pan integral', price: 2700, originalPrice: 3000, category: 'Otros', image: 'PanIntegral.png' },
  { id: 'h3', name: 'Ketchup Heinz', price: 3800, originalPrice: 4200, category: 'Otros', image: 'thumb-tomatoketchup.png' },
  { id: 'h4', name: 'Coca Cola 1,5L', price: 2250, originalPrice: 2500, category: 'Bebidas', image: 'cocacola.png' },
  { id: 'h5', name: 'Jugo de naranja', price: 1620, originalPrice: 1800, category: 'Bebidas', image: 'JuegoNaranja.jpg' },

  // Frutas
  { id: 'f1', name: 'Naranjas jugosas', price: 2550, originalPrice: 3000, category: 'Frutas', image: 'naranja.png' },
  { id: 'f2', name: 'Bananas', price: 2250, originalPrice: 2500, category: 'Frutas', image: 'thumb-bananas.png' },
  { id: 'f3', name: 'Kiwis', price: 3040, originalPrice: 3200, category: 'Frutas', image: 'Kiwi.png' },
  { id: 'f4', name: 'Uvas verdes', price: 2700, originalPrice: 3000, category: 'Frutas', image: 'Uva.png' },

  // Dulces
  { id: 'd1', name: 'Chocolate', price: 3150, originalPrice: 3500, category: 'Dulces', image: 'Chocolate.webp' },
  { id: 'd2', name: 'Frugele', price: 1710, originalPrice: 1800, category: 'Dulces', image: 'frugele.webp' },
  { id: 'd3', name: 'Galletas de mantequilla', price: 2024, originalPrice: 2200, category: 'Dulces', image: 'VinoGalleta.avif' },
  { id: 'd4', name: 'Bombones premium', price: 3520, originalPrice: 4000, category: 'Dulces', image: 'bombones.webp' },
  { id: 'd5', name: 'Chicles sabor menta', price: 950, originalPrice: 1000, category: 'Dulces', image: 'Orbit.webp' },
];

export const getProductsByCategory = (category) => {
  return initialProducts.filter(p => p.category === category);
};

export const getInitialOfferProducts = () => {
    // Retorna solo los productos destacados de la Home
    return initialProducts.slice(0, 5);
}