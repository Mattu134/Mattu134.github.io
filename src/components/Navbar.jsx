import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const { cart, totalItems, totalAmount, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    const cartModalElement = document.getElementById("cartModal");
    if (cartModalElement) {
      const modalInstance =
        bootstrap.Modal.getInstance(cartModalElement) ||
        new bootstrap.Modal(cartModalElement);
      modalInstance.hide();
    }
    navigate("/checkout");
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      return (
        <div className="text-center text-muted py-4">
          <i className="bi bi-cart-x fs-1 d-block mb-2"></i>
          <p className="mb-0">Tu carrito está vacío</p>
        </div>
      );
    }

    return (
      <ul className="list-group list-group-flush">
        {cart.map((item) => {
          const priceTotal = item.price * item.quantity;
          const imageUrl = item.image
            ? `/images/${item.image}`
            : "/images/default-product.png";
          return (
            <li
              key={item.id}
              className="list-group-item d-flex align-items-center justify-content-between py-3"
            >
              <div className="d-flex align-items-center">
                <img
                  src={imageUrl}
                  alt={item.name}
                  style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "contain",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p className="fw-semibold mb-0">{item.name}</p>
                  <small className="text-muted">
                    {item.quantity} x ${item.price.toLocaleString("es-CL")}
                  </small>
                </div>
              </div>

              <div className="text-end">
                <p className="fw-bold mb-1 text-success">
                  ${priceTotal.toLocaleString("es-CL")}
                </p>
                <button
                  className="btn btn-sm btn-outline-danger px-2 py-1"
                  onClick={() => removeFromCart(item.id)}
                  title="Eliminar producto"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link
            className="navbar-brand fw-bold text-success d-flex align-items-center"
            to="/"
          >
            <img
              src="/images/logo.png"
              alt="Logo EcoMarket"
              className="me-2 logo-eco"
              style={{ width: "200px", height: "auto" }}
            />
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuEcoMarket"
          >
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
                <Link className="nav-link fw-semibold text-success" to="/ofertas">
                  <i className="bi bi-tags"></i> Ofertas
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold text-success" to="/nosotros">
                  <i className="bi bi-people"></i> Quienes somos
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link fw-semibold text-success dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-list"></i> Categorías
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/dulces">Dulces</Link></li>
                  <li><Link className="dropdown-item" to="/frutas">Frutas</Link></li>
                  <li><Link className="dropdown-item" to="/carnes">Carnes</Link></li>
                  <li><Link className="dropdown-item" to="/pescados">Pescados</Link></li>
                  <li><Link className="dropdown-item" to="/panaderia">Panadería</Link></li>
                  <li><Link className="dropdown-item" to="/lacteos">Lácteos</Link></li>
                  <li><Link className="dropdown-item" to="/bebestibles">Bebestibles</Link></li>
                  <li><Link className="dropdown-item" to="/aseo">Aseo</Link></li>
                  <li><Link className="dropdown-item" to="/congelados">Congelados</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold text-success" to="/#contacto">
                  <i className="bi bi-telephone"></i> Contáctanos
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center ms-4">
              <SearchBar />

              <Link to="/admin" className="btn btn-outline-success me-3">
                <i className="bi bi-person-circle"></i>
              </Link>

              <button
                className="btn btn-success position-relative"
                data-bs-toggle="modal"
                data-bs-target="#cartModal"
              >
                <i className="bi bi-cart3 fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header bg-success text-white rounded-top-4">
              <h5 className="modal-title">
                <i className="bi bi-cart4 me-2"></i> Tu carrito
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {renderCartItems()}
            </div>

            <div className="modal-footer d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-5">
                Total:{" "}
                <span className="text-success">
                  ${totalAmount.toLocaleString("es-CL")}
                </span>
              </span>
              <div>
                <button className="btn btn-secondary me-2" data-bs-dismiss="modal">
                  Cerrar
                </button>
                <button className="btn btn-success" onClick={handleGoToCheckout}>
                  Ir al pago <i className="bi bi-arrow-right-circle ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
