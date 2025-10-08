// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Función para simular el modal de alerta (usada en script.js)
const showCustomModal = (message) => {
    // Requiere que el modal esté en el DOM (en el CartProvider)
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

    // Calcula el total de ítems y el monto total
    const { totalItems, totalAmount } = useMemo(() => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { totalItems, totalAmount };
    }, [cart]);

    // Lógica para añadir un producto (reemplaza bindAddButtons)
    const addToCart = useCallback((productName, productPrice, productId) => {
        setCart(currentCart => {
            const existing = currentCart.find(item => item.id === productId);
            if (existing) {
                return currentCart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...currentCart, { id: productId, name: productName, price: productPrice, quantity: 1 }];
            }
        });
        showCustomModal(`"${productName}" añadido al carrito.`);
    }, []);

    // Lógica para eliminar un producto del modal del carrito
    const removeFromCart = useCallback((productId) => {
        setCart(currentCart => currentCart.filter(i => i.id !== productId));
    }, []);

    // Lógica del botón pagar (replica btnPagar)
    const processPayment = useCallback(() => {
        if (cart.length === 0) {
            showCustomModal('Tu carrito está vacío.');
        } else {
            showCustomModal('Gracias por tu compra. Total: $' + totalAmount.toLocaleString('es-CL'));
            setCart([]); // Vaciar carrito
        }
    }, [cart, totalAmount]);

    // Lógica de búsqueda
    const handleSearch = useCallback((term) => {
        setSearchTerm(term.toLowerCase().trim());
    }, []);

    const value = useMemo(() => ({
        cart,
        totalItems,
        totalAmount,
        addToCart,
        removeFromCart,
        processPayment,
        searchTerm,
        handleSearch
    }), [cart, totalItems, totalAmount, addToCart, removeFromCart, processPayment, searchTerm, handleSearch]);

    return (
        <CartContext.Provider value={value}>
            {children}
            {/* Modal de alerta personalizado (replicando la funcionalidad de script.js) */}
            <div className="modal fade" id="customAlertModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">EcoMarket</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p id="customAlertModalMessage"></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </CartContext.Provider>
    );
};