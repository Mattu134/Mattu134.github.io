export const initialProducts = [
 // Home (Ofertas)
 { id: 'h1', name: 'Manzanas rojas', price: 2520, originalPrice: 2800, category: 'Frutas', image: 'manzanaRoja.png', stock: 120, expiracion: '2025-11-05', lote: 'FRU-001', proveedor: 'EcoFrutales Ltda.' },
 { id: 'h2', name: 'Pan integral', price: 2700, originalPrice: 3000, category: 'Panadería', image: 'PanIntegral.png', stock: 60, expiracion: '2025-10-25', lote: 'PAN-034', proveedor: 'Panadería San Jorge' },
 { id: 'h3', name: 'Ketchup Heinz', price: 3800, originalPrice: 4200, category: 'Otros', image: 'thumb-tomatoketchup.png', stock: 80, expiracion: '2026-03-15', lote: 'CON-102', proveedor: 'Distribuidora Heinz Chile' },
 { id: 'h4', name: 'Fanta 1,5L', price: 2250, originalPrice: 2500, category: 'Bebestibles', image: 'fanta.jpg', stock: 100, expiracion: '2026-01-20', lote: 'BEB-045', proveedor: 'Coca-Cola Company' },
 { id: 'h5', name: 'Leche Entera 1L', price: 1080, originalPrice: 1200, category: 'Lácteos', image: 'leche_entera.png', stock: 150, expiracion: '2025-12-01', lote: 'LAC-010', proveedor: 'Lácteos del Campo' },

 // Frutas
 { id: 'f1', name: 'Plátanos', price: 1080, originalPrice: 1200, category: 'Frutas', image: 'thumb-bananas.png', stock: 95, expiracion: '2025-11-10', lote: 'FRU-002', proveedor: 'Fundo La Palma' },
 { id: 'f2', name: 'Naranja', price: 1350, originalPrice: 1500, category: 'Frutas', image: 'naranja.png', stock: 110, expiracion: '2025-12-20', lote: 'FRU-003', proveedor: 'Cítricos del Sur' },
 { id: 'f3', name: 'Kiwi', price: 1620, originalPrice: 1800, category: 'Frutas', image: 'Kiwi.png', stock: 85, expiracion: '2025-10-28', lote: 'FRU-004', proveedor: 'Huerto Verde Export' },
 { id: 'f4', name: 'Uvas verdes', price: 2700, originalPrice: 3000, category: 'Frutas', image: 'Uva.png', stock: 140, expiracion: '2025-11-08', lote: 'FRU-005', proveedor: 'Viñedos del Norte' },
 { id: 'f5', name: 'Pera', price: 1400, originalPrice: 1550, category: 'Frutas', image: 'pera.png', stock: 90, expiracion: '2025-11-06', lote: 'FRU-006', proveedor: 'Frutales del Centro' },


 { id: 'v1', name: 'Tomate', price: 1980, originalPrice: 2200, category: 'Verduras', image: 'Tomate.png', stock: 70, expiracion: '2025-11-03', lote: 'VER-006', proveedor: 'Agrícola Los Andes' },
 { id: 'v2', name: 'Cebolla', price: 810, originalPrice: 900, category: 'Verduras', image: 'Cebolla.png', stock: 150, expiracion: '2026-01-01', lote: 'VER-007', proveedor: 'Hortalizas del Valle' },
 { id: 'v3', name: 'Lechuga', price: 1170, originalPrice: 1300, category: 'Verduras', image: 'Lechuga.png', stock: 55, expiracion: '2025-10-26', lote: 'VER-008', proveedor: 'Granja Fresca' },
 { id: 'v4', name: 'Zanahoria', price: 900, originalPrice: 1000, category: 'Verduras', image: 'Zanahoria.png', stock: 130, expiracion: '2025-12-15', lote: 'VER-009', proveedor: 'Tierra Fértil S.A.' },
 { id: 'v5', name: 'Pimentón Rojo', price: 2100, originalPrice: 2300, category: 'Verduras', image: 'pimenton_rojo.png', stock: 65, expiracion: '2025-11-04', lote: 'VER-010', proveedor: 'Agrícola del Sol' },


 // Dulces
 { id: 'd1', name: 'Chocolate tableta', price: 3150, originalPrice: 3500, category: 'Dulces', image: 'Chocolate.webp', stock: 75, expiracion: '2026-05-01', lote: 'DUL-010', proveedor: 'Nestlé Chile' },
 { id: 'd2', name: 'Gomitas Frugele', price: 1710, originalPrice: 1800, category: 'Dulces', image: 'frugele.webp', stock: 200, expiracion: '2026-07-15', lote: 'DUL-011', proveedor: 'Ambrosoli S.A.' },
 { id: 'd3', name: 'Galletas de mantequilla', price: 2024, originalPrice: 2200, category: 'Dulces', image: 'VinoGalleta.avif', stock: 90, expiracion: '2026-02-10', lote: 'DUL-012', proveedor: 'Galletas San José' },
 { id: 'd4', name: 'Bombón surtido', price: 1500, originalPrice: 1650, category: 'Dulces', image: 'bombones.webp', stock: 150, expiracion: '2026-06-01', lote: 'DUL-013', proveedor: 'Chocolate del Bosque' },
 { id: 'd5', name: 'Chicle Menta', price: 600, originalPrice: 700, category: 'Dulces', image: 'chicle_menta.png', stock: 300, expiracion: '2026-08-01', lote: 'DUL-014', proveedor: 'Wrigley Chile' },


 // Carnes 
 { id: 'c1', name: 'Filete de Vacuno (kg)', price: 15500, originalPrice: 17000, category: 'Carnes', image: 'filete_vacuno.png', stock: 30, expiracion: '2025-10-30', lote: 'CAR-015', proveedor: 'Carnes Premium Ltda.' },
 { id: 'c2', name: 'Pechuga de Pollo (kg)', price: 4200, originalPrice: 4800, category: 'Carnes', image: 'pechuga_pollo.png', stock: 70, expiracion: '2025-11-02', lote: 'CAR-016', proveedor: 'Avícola San Pablo' },
 { id: 'c3', name: 'Lomo de Cerdo (kg)', price: 5800, originalPrice: 6300, category: 'Carnes', image: 'lomo_cerdo.png', stock: 45, expiracion: '2025-11-01', lote: 'CAR-017', proveedor: 'Porcinos del Sur' },
 { id: 'c4', name: 'Carne Molida Premium (500g)', price: 3500, originalPrice: 3900, category: 'Carnes', image: 'carne_molida.png', stock: 60, expiracion: '2025-10-29', lote: 'CAR-018', proveedor: 'Carnes Premium Ltda.' },
 { id: 'c5', name: 'Costillar de Cordero (kg)', price: 9500, originalPrice: 10500, category: 'Carnes', image: 'costillar_cordero.png', stock: 25, expiracion: '2025-11-05', lote: 'CAR-019', proveedor: 'Carnes del Campo' },


 // Pescados 
 { id: 'p1', name: 'Salmón Fresco (kg)', price: 12000, originalPrice: 13500, category: 'Pescados', image: 'salmon_fresco.png', stock: 20, expiracion: '2025-10-28', lote: 'PES-020', proveedor: 'Pescadería El Ancla' },
 { id: 'p2', name: 'Merluza Austral (kg)', price: 6500, originalPrice: 7200, category: 'Pescados', image: 'merluza_austral.png', stock: 35, expiracion: '2025-10-30', lote: 'PES-021', proveedor: 'Mar del Sur S.A.' },
 { id: 'p3', name: 'Camarones Congelados (500g)', price: 7800, originalPrice: 8500, category: 'Pescados', image: 'camarones.png', stock: 50, expiracion: '2026-04-10', lote: 'PES-022', proveedor: 'Distribuidora del Mar' },
 { id: 'p4', name: 'Atún enlatado (und.)', price: 1500, originalPrice: 1700, category: 'Pescados', image: 'atun_enlatado.png', stock: 120, expiracion: '2027-01-01', lote: 'PES-023', proveedor: 'Conservas Oceánicas' },
 { id: 'p5', name: 'Ostiones (docena)', price: 9000, originalPrice: 10000, category: 'Pescados', image: 'ostiones.png', stock: 15, expiracion: '2025-11-03', lote: 'PES-024', proveedor: 'Pescadería El Ancla' },


 // Panadería 
 { id: 'b1', name: 'Marraqueta (unidad)', price: 350, originalPrice: 400, category: 'Panadería', image: 'marraqueta.png', stock: 200, expiracion: '2025-10-26', lote: 'PAN-025', proveedor: 'Panadería San Jorge' },
 { id: 'b2', name: 'Pan de Molde Blanco', price: 1800, originalPrice: 2000, category: 'Panadería', image: 'pan_molde_blanco.png', stock: 80, expiracion: '2025-11-05', lote: 'PAN-026', proveedor: 'Panificadora Delicia' },
 { id: 'b3', name: 'Croissant (unidad)', price: 900, originalPrice: 1000, category: 'Panadería', image: 'croissant.png', stock: 70, expiracion: '2025-10-27', lote: 'PAN-027', proveedor: 'Pastelería Francesa' },
 { id: 'b4', name: 'Baguette Rústica', price: 1200, originalPrice: 1350, category: 'Panadería', image: 'baguette.png', stock: 50, expiracion: '2025-10-26', lote: 'PAN-028', proveedor: 'Panadería Rústica' },
 { id: 'b5', name: 'Queque Marmolado (500g)', price: 2900, originalPrice: 3200, category: 'Panadería', image: 'queque_marmolado.png', stock: 40, expiracion: '2025-11-10', lote: 'PAN-029', proveedor: 'Pastelería Delicias' },

 // Lácteos 
 { id: 'l1', name: 'Yogurt Natural (pack 4)', price: 2100, originalPrice: 2300, category: 'Lácteos', image: 'yogurt_natural.png', stock: 110, expiracion: '2025-11-15', lote: 'LAC-030', proveedor: 'Lácteos del Campo' },
 { id: 'l2', name: 'Queso Gauda laminado (200g)', price: 3500, originalPrice: 3800, category: 'Lácteos', image: 'queso_gauda.png', stock: 65, expiracion: '2025-12-05', lote: 'LAC-031', proveedor: 'El Quesero Ltda.' },
 { id: 'l3', name: 'Mantequilla sin sal (250g)', price: 2200, originalPrice: 2500, category: 'Lácteos', image: 'mantequilla.png', stock: 90, expiracion: '2026-01-25', lote: 'LAC-032', proveedor: 'Cremería Alpina' },
 { id: 'l4', name: 'Leche Descremada 1L', price: 1150, originalPrice: 1300, category: 'Lácteos', image: 'leche_descremada.png', stock: 130, expiracion: '2025-12-10', lote: 'LAC-033', proveedor: 'Lácteos del Campo' },
 { id: 'l5', name: 'Crema de Leche (200ml)', price: 1600, originalPrice: 1800, category: 'Lácteos', image: 'crema_leche.png', stock: 75, expiracion: '2025-11-20', lote: 'LAC-034', proveedor: 'Cremería Alpina' },


 // Bebestibles 
 { id: 'bbt1', name: 'Agua mineral sin gas (1.5L)', price: 800, originalPrice: 900, category: 'Bebestibles', image: 'agua_mineral.png', stock: 200, expiracion: '2027-05-01', lote: 'BEB-035', proveedor: 'Aguas Puras' },
 { id: 'bbt2', name: 'Jugo de Naranja natural (1L)', price: 2500, originalPrice: 2800, category: 'Bebestibles', image: 'jugo_naranja.png', stock: 55, expiracion: '2025-12-01', lote: 'BEB-036', proveedor: 'Juguera Andina' },
 { id: 'bbt3', name: 'Cerveza Lager (six-pack)', price: 4900, originalPrice: 5500, category: 'Bebestibles', image: 'cerveza_lager.png', stock: 85, expiracion: '2026-03-01', lote: 'BEB-037', proveedor: 'Cervecería Austral' },
 { id: 'bbt4', name: 'Vino Tinto Reserva (750ml)', price: 6500, originalPrice: 7200, category: 'Bebestibles', image: 'vino_tinto.png', stock: 40, expiracion: '2030-01-01', lote: 'BEB-038', proveedor: 'Viña El Roble' },
 { id: 'bbt5', name: 'Bebida cola Zero (2L)', price: 2300, originalPrice: 2600, category: 'Bebestibles', image: 'bebida_cola_zero.png', stock: 120, expiracion: '2026-02-15', lote: 'BEB-039', proveedor: 'Coca-Cola Company' },


 // Aseo 
 { id: 'as1', name: 'Detergente líquido (3L)', price: 7800, originalPrice: 8500, category: 'Aseo', image: 'detergente_liquido.png', stock: 70, expiracion: 'N/A', lote: 'ASE-040', proveedor: 'Químicos del Hogar' },
 { id: 'as2', name: 'Papel Higiénico (pack 12)', price: 5200, originalPrice: 5800, category: 'Aseo', image: 'papel_higienico.png', stock: 95, expiracion: 'N/A', lote: 'ASE-041', proveedor: 'Papelería Nacional' },
 { id: 'as3', name: 'Cloro Gel (1L)', price: 1500, originalPrice: 1700, category: 'Aseo', image: 'cloro_gel.png', stock: 110, expiracion: '2027-03-01', lote: 'ASE-042', proveedor: 'Limpieza Total' },
 { id: 'as4', name: 'Jabón de tocador (pack 3)', price: 1800, originalPrice: 2000, category: 'Aseo', image: 'jabon_tocador.png', stock: 80, expiracion: '2026-10-01', lote: 'ASE-043', proveedor: 'Belleza y Cuidado' },
 { id: 'as5', name: 'Limpiavidrios (500ml)', price: 1200, originalPrice: 1400, category: 'Aseo', image: 'limpiavidrios.png', stock: 60, expiracion: 'N/A', lote: 'ASE-044', proveedor: 'Limpieza Total' },


 // Congelados 
 { id: 'cg1', name: 'Papas Fritas Prefritas (1kg)', price: 3200, originalPrice: 3500, category: 'Congelados', image: 'papas_fritas_congeladas.png', stock: 80, expiracion: '2026-09-01', lote: 'CON-045', proveedor: 'Frigoríficos del Maule' },
 { id: 'cg2', name: 'Mix de Verduras Congeladas (500g)', price: 2500, originalPrice: 2800, category: 'Congelados', image: 'mix_verduras.png', stock: 100, expiracion: '2027-02-01', lote: 'CON-046', proveedor: 'Huerto Fresco' },
 { id: 'cg3', name: 'Pizza Pepperoni Congelada', price: 4500, originalPrice: 5000, category: 'Congelados', image: 'pizza_pepperoni.png', stock: 60, expiracion: '2026-11-01', lote: 'CON-047', proveedor: 'Pizzas Gourmet' },
 { id: 'cg4', name: 'Helado Vainilla (1L)', price: 3800, originalPrice: 4200, category: 'Congelados', image: 'helado_vainilla.png', stock: 75, expiracion: '2026-06-01', lote: 'CON-048', proveedor: 'Helados del Mundo' },
 { id: 'cg5', name: 'Hamburguesas de Res (pack 4)', price: 4900, originalPrice: 5400, category: 'Congelados', image: 'hamburguesas_res.png', stock: 50, expiracion: '2026-05-01', lote: 'CON-049', proveedor: 'Carnes Premium Ltda.' },
 

];

export const getProductsByCategory = (category) => {
 return initialProducts.filter(p => p.category === category);
};

export const getInitialOfferProducts = () => {
 // Retorna solo los productos destacados de la Home (los que tienen ID que empieza con 'h')
 return initialProducts.filter(p => p.id.startsWith('h'));
};