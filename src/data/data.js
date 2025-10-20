export const initialProducts = [
  // Home (Ofertas)
  { id: 'h1', name: 'Manzanas rojas', price: 2520, originalPrice: 2800, category: 'Frutas', image: 'manzanaRoja.png', stock: 120, expiracion: '2025-11-05', lote: 'FRU-001', proveedor: 'EcoFrutales Ltda.' },
  { id: 'h2', name: 'Pan integral', price: 2700, originalPrice: 3000, category: 'Otros', image: 'PanIntegral.png', stock: 60, expiracion: '2025-10-25', lote: 'PAN-034', proveedor: 'Panadería San Jorge' },
  { id: 'h3', name: 'Ketchup Heinz', price: 3800, originalPrice: 4200, category: 'Otros', image: 'thumb-tomatoketchup.png', stock: 80, expiracion: '2026-03-15', lote: 'CON-102', proveedor: 'Distribuidora Heinz Chile' },
  { id: 'h4', name: 'Fanta 1,5L', price: 2250, originalPrice: 2500, category: 'Bebidas', image: 'fanta.jpg', stock: 100, expiracion: '2026-01-20', lote: 'BEB-045', proveedor: 'Coca-Cola Company' },
  
  // Frutas
  { id: 'f1', name: 'Plátanos', price: 1080, originalPrice: 1200, category: 'Frutas', image: 'thumb-bananas.png', stock: 95, expiracion: '2025-11-10', lote: 'FRU-002', proveedor: 'Fundo La Palma' },
  { id: 'f2', name: 'Naranja', price: 1350, originalPrice: 1500, category: 'Frutas', image: 'naranja.png', stock: 110, expiracion: '2025-12-20', lote: 'FRU-003', proveedor: 'Cítricos del Sur' },
  { id: 'f3', name: 'Kiwi', price: 1620, originalPrice: 1800, category: 'Frutas', image: 'Kiwi.png', stock: 85, expiracion: '2025-10-28', lote: 'FRU-004', proveedor: 'Huerto Verde Export' },
  { id: 'f4', name: 'Uvas verdes', price: 2700, originalPrice: 3000, category: 'Frutas', image: 'Uva.png', stock: 140, expiracion: '2025-11-08', lote: 'FRU-005', proveedor: 'Viñedos del Norte' },

  // Verduras
  { id: 'v1', name: 'Tomate', price: 1980, originalPrice: 2200, category: 'Verduras', image: 'Tomate.png', stock: 70, expiracion: '2025-11-03', lote: 'VER-006', proveedor: 'Agrícola Los Andes' },
  { id: 'v2', name: 'Cebolla', price: 810, originalPrice: 900, category: 'Verduras', image: 'Cebolla.png', stock: 150, expiracion: '2026-01-01', lote: 'VER-007', proveedor: 'Hortalizas del Valle' },
  { id: 'v3', name: 'Lechuga', price: 1170, originalPrice: 1300, category: 'Verduras', image: 'Lechuga.png', stock: 55, expiracion: '2025-10-26', lote: 'VER-008', proveedor: 'Granja Fresca' },
  { id: 'v4', name: 'Zanahoria', price: 900, originalPrice: 1000, category: 'Verduras', image: 'Zanahoria.png', stock: 130, expiracion: '2025-12-15', lote: 'VER-009', proveedor: 'Tierra Fértil S.A.' },

  // Dulces
  { id: 'd1', name: 'Chocolate', price: 3150, originalPrice: 3500, category: 'Dulces', image: 'Chocolate.webp', stock: 75, expiracion: '2026-05-01', lote: 'DUL-010', proveedor: 'Nestlé Chile' },
  { id: 'd2', name: 'Frugele', price: 1710, originalPrice: 1800, category: 'Dulces', image: 'frugele.webp', stock: 200, expiracion: '2026-07-15', lote: 'DUL-011', proveedor: 'Ambrosoli S.A.' },
  { id: 'd3', name: 'Galletas de mantequilla', price: 2024, originalPrice: 2200, category: 'Dulces', image: 'VinoGalleta.avif', stock: 90, expiracion: '2026-02-10', lote: 'DUL-012', proveedor: 'Galletas San José' },
  { id: 'd4', name: 'Bombón', price: 1500, originalPrice: 1650, category: 'Dulces', image: 'bombones.webp', stock: 150, expiracion: '2026-06-01', lote: 'DUL-013', proveedor: 'Chocolate del Bosque' }

];
export const getProductsByCategory = (category) => {

  return initialProducts.filter(p => p.category === category);

};
export const getInitialOfferProducts = () => {

  // Retorna solo los productos destacados de la Home

  return initialProducts.slice(0, 5);

};
