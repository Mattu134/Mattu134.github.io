import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Importamos tu context real
import { CartProvider, useCart } from '../context/CartContext';

// 1. Un componente falso que consume el contexto y muestra sus valores
const TestComponent = () => {
  // Usamos los nombres exactos de tu CartContext
  const { cart, addToCart, removeFromCart, processPayment, totalAmount } = useCart();

  return (
    <div>
      {/* Botones para disparar las acciones */}
      <button onClick={() => addToCart('Manzana', 1000, 'p1', 'img.png')}>
        Add Manzana
      </button>
      <button onClick={() => addToCart('Plátano', 500, 'p2', 'img.png')}>
        Add Plátano
      </button>
      <button onClick={() => removeFromCart('p1')}>Remove Manzana</button>
      {/* Llamamos a processPayment para probar que el carrito se vacía */}
      <button onClick={() => processPayment()}>Process Payment</button>

      {/* Salidas para verificar los resultados */}
      <div data-testid="cart-total">Total: {totalAmount}</div>
      <div data-testid="cart-items">
        {cart.map(item => (
          <div key={item.id}>
            {item.name} - Qty: {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Mockeamos el modal de bootstrap que usas en 'processPayment'
// Tu CartContext intenta mostrar un modal, lo cual fallaría en un test.
// Le decimos a Vitest: "Cuando veas esta importación, simúlala".
vi.mock('bootstrap/dist/js/bootstrap.bundle.min.js', () => ({
  Modal: vi.fn(() => ({
    show: vi.fn(), // Simula la función show()
    hide: vi.fn(), // Simula la función hide()
  })),
}));

// 3. Una función helper para renderizar nuestro componente falso CON el provider
const renderWithProvider = () => {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
};

describe('CartContext Logic', () => {
  const user = userEvent.setup();

  it('debería agregar un producto y calcular el total (addToCart)', async () => {
    renderWithProvider();

    const addButton = screen.getByText('Add Manzana');
    await user.click(addButton);

    expect(screen.getByTestId('cart-items')).toHaveTextContent('Manzana - Qty: 1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 1000');
  });

  it('debería incrementar la cantidad y recalcular el total', async () => {
    renderWithProvider();
    const addButton = screen.getByText('Add Manzana');

    // 'act' se usa para envolver actualizaciones de estado múltiples
    await act(async () => {
      await user.click(addButton);
      await user.click(addButton); // Se agrega 2 veces
    });

    expect(screen.getByTestId('cart-items')).toHaveTextContent('Manzana - Qty: 2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 2000');
  });

  it('debería eliminar un producto y recalcular el total (removeFromCart)', async () => {
    renderWithProvider();

    await act(async () => {
      await user.click(screen.getByText('Add Manzana')); // Total 1000
      await user.click(screen.getByText('Add Plátano')); // Total 1500
    });
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 1500');

    await user.click(screen.getByText('Remove Manzana')); // Quita 1000

    expect(screen.getByTestId('cart-items')).not.toHaveTextContent('Manzana');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('Plátano - Qty: 1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 500');
  });

   it('debería vaciar el carrito al procesar el pago (processPayment)', async () => {
    renderWithProvider();
    
    await act(async () => {
      await user.click(screen.getByText('Add Manzana'));
      await user.click(screen.getByText('Add Plátano'));
    });
    // Verifica que el carrito está lleno
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 1500');

    // Llama a la función que SÍ tienes (processPayment)
    await user.click(screen.getByText('Process Payment'));
    
    // Verifica que el carrito se vació
    expect(screen.getByTestId('cart-items')).toBeEmptyDOMElement();
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 0');
  });
});