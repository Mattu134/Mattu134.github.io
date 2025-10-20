import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirige al usuario a la página de login después de cerrar sesión
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-5">   
        <Link className="navbar-brand d-flex align-items-center fw-bold text-success" to="/admin">
            ECO MARKET - ADMIN
        </Link>

        <div className="d-flex align-items-center">
          <span className="navbar-text me-3 text-muted">
           Perfil: {user ? user.username : 'Administrador'}
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