import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm py-3">
      <div className="container-fluid px-4">
        <span
          role="button"
          className="navbar-brand d-flex align-items-center fw-bold text-success"
          onClick={() => navigate('/admin')}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Panel de Gestión
        </span>
        <div className="navbar-nav d-flex align-items-center gap-3">
          {/* Admin y vendedor ven productos*/}
          {(role === "Administrador" || role === "Vendedor") && (
            <button
              className="btn btn-link nav-link fw-semibold text-dark"
              onClick={() => navigate('/admin/productos')}
            >
              <i className="bi bi-box-seam me-1"></i> Productos
            </button>
          )}
          {/* Solo admin ve usuario*/}
          {role === "Administrador" && (
            <button
              className="btn btn-link nav-link fw-semibold text-dark"
              onClick={() => navigate('/admin/usuarios')}
            >
              <i className="bi bi-people me-1"></i> Usuarios
            </button>
          )}
          {/*Admin y vendedor ven ordenes*/}
          {(role === "Administrador" || role === "Vendedor") && (
            <button
              className="btn btn-link nav-link fw-semibold text-dark"
              onClick={() => navigate('/admin/pedidos')}
            >
              <i className="bi bi-receipt me-1"></i> Órdenes
            </button>
          )}
          {/* Solo admin ve ventas */}
          {role === "Administrador" && (
            <button
              className="btn btn-link nav-link fw-semibold text-dark"
              onClick={() => navigate('/admin/ventas')}
            >
              <i className="bi bi-cash-coin me-1"></i> Ventas
            </button>
          )}

        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-success d-flex align-items-center"
            onClick={handleGoHome}
          >
            <i className="bi bi-shop me-1"></i>
            Ir a la tienda
          </button>
          {/* Dropdown de usuario */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle me-2"></i>
              {user?.name || user?.username || "Usuario"}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item-text px-3">
                <small className="text-muted">Rol:</small>{" "}
                <span className="fw-bold">{role}</span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
