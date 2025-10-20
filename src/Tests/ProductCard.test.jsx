import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../context/CartContext'; 

describe('Componente ProductCard', () => {
  
  const mockProduct = {
    id: 'test1',
    name: 'Manzana Test',
    price: 2500,
    originalPrice: 3000,
    category: 'Frutas',
    image: 'manzanaRoja.png' 
  };

  it('debería renderizar el nombre y el precio formateado del producto', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Manzana Test')).toBeTruthy();
    expect(screen.getByText(/\$\s?2\.500/)).toBeTruthy(); 
    expect(screen.getByText(/\$\s?3\.000/)).toBeTruthy();
    expect(screen.getByText(/\$\s?3\.000/)).toHaveClass('text-decoration-line-through');
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeTruthy();
  });

  it('debería construir correctamente la URL de la imagen', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const imagen = screen.getByAltText('Manzana Test'); 
    expect(imagen).toHaveAttribute('src', '/images/manzanaRoja.png');
  });

});