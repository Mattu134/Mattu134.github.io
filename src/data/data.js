export const initialProducts = [
  // Home (Ofertas)
  { id: 'h1', name: 'Manzanas rojas', price: 2520, originalPrice: 2800, category: 'Frutas', image: 'manzanaRoja.png', stock: 120, expiryDate: '2025-11-05', batch: 'FRU-001', supplie: 'EcoFrutales Ltda.' },
  { id: 'h2', name: 'Pan integral', price: 2700, originalPrice: 3000, category: 'Otros', image: 'PanIntegral.png', stock: 60, expiryDate: '2025-10-25', batch: 'PAN-034', supplie: 'Panadería San Jorge' },
  { id: 'h3', name: 'Ketchup Heinz', price: 3800, originalPrice: 4200, category: 'Otros', image: 'thumb-tomatoketchup.png', stock: 80, expiryDate: '2026-03-15', batch: 'CON-102', supplie: 'Distribuidora Heinz Chile' },
  { id: 'h4', name: 'Fanta 1,5L', price: 2250, originalPrice: 2500, category: 'Bebidas', image: 'fanta.jpg', stock: 100, expiryDate: '2026-01-20', batch: 'BEB-045', supplie: 'Coca-Cola Company' },
  { id: 'h5', name: 'Jugo de naranja', price: 1620, originalPrice: 1800, category: 'Bebidas', image: 'JuegoNaranja.jpg', stock: 90, expiryDate: '2025-12-01', batch: 'BEB-056', supplie: 'Jugos del Valle' },

  // Frutas
  { id: 'f1', name: 'Naranjas jugosas', price: 2550, originalPrice: 3000, category: 'Frutas', image: 'naranja.png', stock: 150, expiryDate: '2025-11-10', batch: 'FRU-002', supplie: 'Agrícola del Sol' },
  { id: 'f2', name: 'Bananas', price: 2250, originalPrice: 2500, category: 'Frutas', image: 'thumb-bananas.png', stock: 180, expiryDate: '2025-10-28', batch: 'FRU-003', supplie: 'Frutales Premium' },
  { id: 'f3', name: 'Kiwis', price: 3040, originalPrice: 3200, category: 'Frutas', image: 'Kiwi.png', stock: 130, expiryDate: '2025-11-12', batch: 'FRU-004', supplie: 'Campo Verde Export' },
  { id: 'f4', name: 'Uvas verdes', price: 2700, originalPrice: 3000, category: 'Frutas', image: 'Uva.png', stock: 140, expiryDate: '2025-11-08', batch: 'FRU-005', supplie: 'Viñedos del Norte' },

  // Dulces
  { id: 'd1', name: 'Chocolate', price: 3150, originalPrice: 3500, category: 'Dulces', image: 'Chocolate.webp', stock: 75, expiryDate: '2026-05-01', batch: 'DUL-010', supplie: 'Nestlé Chile' },
  { id: 'd2', name: 'Frugele', price: 1710, originalPrice: 1800, category: 'Dulces', image: 'frugele.webp', stock: 200, expiryDate: '2026-07-15', batch: 'DUL-011', supplie: 'Ambrosoli S.A.' },
  { id: 'd3', name: 'Galletas de mantequilla', price: 2024, originalPrice: 2200, category: 'Dulces', image: 'VinoGalleta.avif', stock: 90, expiryDate: '2026-02-10', batch: 'DUL-012', supplie: 'Galletas San José' },
  { id: 'd4', name: 'Bombones premium', price: 3520, originalPrice: 4000, category: 'Dulces', image: 'bombones.webp', stock: 50, expiryDate: '2026-03-22', batch: 'DUL-013', supplie: 'Ferrero Rocher' },
  { id: 'd5', name: 'Chicles sabor menta', price: 950, originalPrice: 1000, category: 'Dulces', image: 'Orbit.webp', stock: 300, expiryDate: '2026-08-30', batch: 'DUL-014', supplie: 'Wrigley Company' },
];

export const getProductsByCategory = (category) => {
  return initialProducts.filter(p => p.category === category);
};

export const getInitialOfferProducts = () => {
  // Retorna solo los productos destacados de la Home
  return initialProducts.slice(0, 5);
};
