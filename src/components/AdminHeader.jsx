import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-5">

        <span
          role="button"
          className="navbar-brand d-flex align-items-center fw-bold text-success"
          onClick={() => navigate('/admin')}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Panel
        </span>

        <div className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">

          <button
            className="nav-link text-dark fw-semibold btn btn-link"
            onClick={() => navigate('/admin/productos')}
          >
            Productos
          </button>

          <button
            className="nav-link text-dark fw-semibold btn btn-link"
            onClick={() => navigate('/admin/usuarios')}
          >
            Usuarios
          </button>

        </div>

        <div className="d-flex align-items-center gap-3">

          <button
            className="btn btn-outline-success"
            onClick={handleGoHome}
          >
            <i className="bi bi-shop me-1"></i>
            Volver a la tienda
          </button>

          <span className="navbar-text text-muted">
            <span className="fw-bold text-dark">Perfil:</span>{" "}
            <span className="fw-bold text-dark">
              {user ? user.username : "Administrador"}
            </span>
          </span>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>

        </div>

      </div>
    </nav>
  );
};

export default AdminHeader;
