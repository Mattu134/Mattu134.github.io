import { describe, it, expect, vi, beforeEach } from 'vitest';
// Importamos las funciones REALES que queremos probar
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
  resetDatabaseForTests // Importamos la nueva función
} from '../services/productServices';

// Mockeamos la librería 'uuid' para que siempre devuelva el mismo ID
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-123',
}));

describe('ProductServices (Simulación de Base de Datos)', () => {

  // Reiniciamos la base de datos antes de cada prueba
  beforeEach(() => {
    resetDatabaseForTests();
  });

  it('debería crear un producto nuevo (createProduct)', async () => {
    const newProductData = { name: 'Producto Nuevo', price: 100, stock: 10 };
    const created = await createProduct(newProductData);

    expect(created.name).toBe('Producto Nuevo');
    expect(created.id).toBe('mock-uuid-123');

    const products = await fetchProducts();
    const found = products.find(p => p.id === 'mock-uuid-123');
    expect(found).toBeDefined();
    // 16 productos iniciales + 1 nuevo
    expect(products.length).toBe(17); 
  });

  it('debería eliminar un producto (deleteProduct)', async () => {
    const productIdToDelete = 'h1'; // Manzanas rojas (existe en data.js)
    
    const productBefore = await fetchProductById(productIdToDelete);
    expect(productBefore.name).toBe('Manzanas rojas');
    
    await deleteProduct(productIdToDelete);

    // Verifica que ya no se puede encontrar
    await expect(fetchProductById(productIdToDelete)).rejects.toThrow('Producto no encontrado');

    // Verifica que la lista total se redujo
    const productsAfter = await fetchProducts();
    // 16 productos iniciales - 1
    expect(productsAfter.length).toBe(15); 
  });

  it('debería actualizar un producto (updateProduct)', async () => {
    const productIdToUpdate = 'h2'; // Pan integral
    
    const productBefore = await fetchProductById(productIdToUpdate);
    expect(productBefore.name).toBe('Pan integral');

    const updatedData = { 
      ...productBefore, 
      name: 'Pan Integral 2.0', 
      stock: 50 
    };

    const updated = await updateProduct(updatedData);
    expect(updated.name).toBe('Pan Integral 2.0');
    expect(updated.stock).toBe(50);

    // Verifica que los cambios se guardaron en la "BD"
    const productAfter = await fetchProductById(productIdToUpdate);
    expect(productAfter.name).toBe('Pan Integral 2.0');
    expect(productAfter.stock).toBe(50);
  });
});