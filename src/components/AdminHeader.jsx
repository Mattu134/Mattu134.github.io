import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-5">
        <Link 
          to="/admin" 
          className="d-flex align-items-center text-decoration-none"
          style={{ cursor: 'pointer' }}
          aria-label="Volver al panel de administración"
        >
          <img
            src="/images/logo.png"  
            alt="Logo EcoMarket"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span className="navbar-brand fw-bold text-success mb-0">
            Admin Panel
          </span>
        </Link>
        <div className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
          <Link 
            to="/admin/productos" 
            className="nav-link text-dark fw-semibold"
          >
            Productos
          </Link>
        </div>

        <div className="d-flex align-items-center">
          <span className="navbar-text me-3 text-muted">
            <span className="fw-bold text-dark">Perfil: </span>
            <span className="fw-bold text-dark">
              {user ? user.username : 'Administrador'}
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
