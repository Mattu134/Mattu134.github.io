import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader'; 


const DashboardCard = ({ title, description, icon, route }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      onClick={() => navigate(route)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card h-100 p-4 border-2 shadow-sm" style={{ borderLeft: '4px solid #198754' }}>
        <div className="card-body text-center">
          <div className="mb-3" style={{ fontSize: '3rem', color: '#198754' }}>
            {icon}
          </div>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

function AdminPanel() {
  return (
    <div className="bg-light min-vh-100">
      
      <AdminHeader /> 

      <div className="container py-5">
        
        <h1 className="text-center mb-5 display-5 fw-normal">Dashboard</h1>

        <div className="row justify-content-center">
          
          <DashboardCard
            title="Usuarios"
            description="Gestionar usuarios del sistema"
            icon={<i className="bi bi-people-fill"></i>}
            route="/admin/usuarios"
          />

          <DashboardCard
            title="Productos"
            description="Administrar catálogo de productos"
            icon={<i className="bi bi-tags-fill"></i>}
            route="/admin/productos" 
          />
          
          <DashboardCard
            title="Ventas"
            description="Ver y administrar ventas realizadas"
            icon={<i className="bi bi-cart-check-fill"></i>}
            route="/admin/ventas"
          />
          
          <DashboardCard
            title="Pedidos"
            description="Gestionar pedidos y envíos"
            icon={<i className="bi bi-box-seam-fill"></i>}
            route="/admin/pedidos"
          />
          
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;