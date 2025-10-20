import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const { cart, totalItems, totalAmount, removeFromCart, processPayment } = useCart();
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    // 1. Ocultar el modal del carrito
    const cartModalElement = document.getElementById('cartModal');
    if (cartModalElement) {
        const modalInstance = bootstrap.Modal.getInstance(cartModalElement) || new bootstrap.Modal(cartModalElement);
        modalInstance.hide();
    }
    
    navigate('../Pages/Checkout' );
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      return <p className="text-center text-muted">No hay productos en el carrito.</p>;
    }

    return cart.map(item => {
      const priceTotal = item.price * item.quantity;
      return (
        <p key={item.id} className="mb-1 d-flex justify-content-between align-items-center">
          <span>{item.name}: {item.quantity} - ${priceTotal.toLocaleString('es-CL')}</span>
          <button
            className="btn btn-sm btn-danger ms-2"
            onClick={() => removeFromCart(item.id)}
          >
            X
          </button>
        </p>
      );
    });
  };

  return (
    <>
      <nav id="site-header" className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success d-flex align-items-center" to="/">
            <img src="/images/logo.png" alt="Logo EcoMarket" className="me-2 logo-eco" style={{ width: '200px', height: 'auto' }} />
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#menuEcoMarket">
            <i className="bi bi-list text-success fs-2"></i>
          </button>

          <div className="collapse navbar-collapse" id="menuEcoMarket">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold text-success" to="/">
                  <i className="bi bi-house"></i> Inicio
                </NavLink>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-success" to="/#ofertas">
                  <i className="bi bi-tags"></i> Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-success" to="/quienes-somos">
                  <i className="bi bi-people"></i> Quienes somos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-success" to="/#contacto">
                  <i className="bi bi-telephone"></i> Contáctanos
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link fw-semibold text-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-list"></i> Categorías
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/dulces">Dulces</Link></li>
                  <li><Link className="dropdown-item" to="/frutas">Frutas</Link></li>
                </ul>
              </li>
            </ul>

            <div className="d-flex align-items-center ms-4">
              <SearchBar />
              <Link to="/admin" className="btn btn-outline-success me-4">
                <i className="bi bi-person-circle"></i>
              </Link>
              
              <button className="btn btn-success position-relative" data-bs-toggle="modal" data-bs-target="#cartModal">
                <i className="bi bi-cart3"></i>
                <span id="cart-count" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title"><i className="bi bi-cart4"></i> Tu carrito</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div id="cart-items" className="mb-3">{renderCartItems()}</div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <span className="fw-bold">Total: <span id="cart-total">${totalAmount.toLocaleString('es-CL')}</span></span>
              <div>
                <button className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button className="btn btn-success" id="btn-pagar" onClick={handleGoToCheckout} data-bs-dismiss="modal">Ir al pago</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;