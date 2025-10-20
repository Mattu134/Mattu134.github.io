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
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-5">
        
        <a className="navbar-brand d-flex align-items-center fw-bold text-success" href="/admin">
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Panel
        </a>

        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <a className="nav-link text-dark fw-semibold" href="/admin/productos">Productos</a>
        </div>


        <div className="d-flex align-items-center">
          <span className="navbar-text me-3 text-muted">
           <span className="fw-bold text-dark">Perfil:</span> 
           <span className="fw-bold text-dark">{user ? user.username : 'Administrador'}</span>
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
