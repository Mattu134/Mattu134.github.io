import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

/**
 * Muestra un modal personalizado.
 * @param {string} message - Mensaje a mostrar
 */

// Función para mostrar un modal personalizado
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

    // Calcula el total y el monto actual del carrito
    const { totalItems, totalAmount } = useMemo(() => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { totalItems, totalAmount };
    }, [cart]);

    // Logica para agregar un producto al carrito
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
    }, []);

    // Logica para eliminar un producto del carrito
    const removeFromCart = useCallback((productId) => {
        setCart(currentCart => currentCart.filter(i => i.id !== productId));
    }, []);

    // Logica para procesar el pago
    const processPayment = useCallback(() => {
        if (cart.length === 0) {
            showCustomModal('Tu carrito está vacío.');
        } else {
            showCustomModal('Gracias por tu compra. Total: $' + totalAmount.toLocaleString('es-CL'));
            setCart([]); // Vaciar carrito
        }
    }, [cart, totalAmount]);

    // logica para manejar la búsqueda
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