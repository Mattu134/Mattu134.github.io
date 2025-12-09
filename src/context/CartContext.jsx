import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Función auxiliar para mostrar el modal de Bootstrap
const showCustomModal = (message) => {
  const modalElement = document.getElementById('customAlertModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    const modalMessage = document.getElementById('customAlertModalMessage');
    if (modalMessage) {
      modalMessage.textContent = message;
    }
    modal.show();
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // --- MODIFICACIÓN CLAVE: Lógica de conteo ---
  const { totalItems, totalAmount } = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => {
      // SI es Granel (ej: 0.5 Kg de tomate), cuenta como 1 ítem/bulto.
      // SI es Unidad (ej: 2 leches), sumamos la cantidad (2).
      const cantidadAContar = item.esGranel ? 1 : item.quantity;
      return sum + cantidadAContar;
    }, 0);
    
    // El monto total sigue siendo Precio * Cantidad (funciona con decimales)
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return { totalItems, totalAmount };
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(currentCart => {
      const existing = currentCart.find(item => item.id === product.id);

      if (existing) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...currentCart,
          {
            id: product.id,
            name: product.nombre || product.name,
            price: product.precio || product.price,
            image: product.imagen || product.image || product.imagenUrl,
            esGranel: product.esGranel, // IMPORTANTE: Guardamos la bandera
            quantity: quantity
          }
        ];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(currentCart => currentCart.filter(i => i.id !== productId));
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCart(currentCart =>
      currentCart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  const processPayment = useCallback(() => {
    if (cart.length === 0) {
      showCustomModal('Tu carrito está vacío.');
    } else {
      showCustomModal('Gracias por tu compra. Total: $' + Math.round(totalAmount).toLocaleString('es-CL'));
      setCart([]); 
    }
  }, [cart, totalAmount]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term.toLowerCase().trim());
  }, []);

  const value = useMemo(() => ({
    cart,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    processPayment,
    searchTerm,
    handleSearch
  }), [
    cart,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    processPayment,
    searchTerm,
    handleSearch
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="modal fade" id="customAlertModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">EcoMarket</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p id="customAlertModalMessage" className="fs-5"></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
};