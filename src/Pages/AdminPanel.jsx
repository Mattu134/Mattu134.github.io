import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

const DashboardCard = ({ title, description, iconClass, route }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100 p-4 border-2 shadow-sm"
        style={{
          borderLeft: '4px solid #198754',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onClick={() => navigate(route)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
        }}
      >
        <div className="card-body text-center">
          <div className="mb-3" style={{ fontSize: '3rem', color: '#198754' }}>
            <i className={`bi ${iconClass}`}></i>
          </div>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

function AdminPanel() {
  const cards = [
    {
      title: 'Usuarios',
      description: 'Gestionar usuarios del sistema',
      iconClass: 'bi-people-fill',
      route: '/admin/usuarios',
    },
    {
      title: 'Productos',
      description: 'Administrar catálogo de productos y stock',
      iconClass: 'bi-box-seam',
      route: '/admin/productos',
    },
    {
      title: 'Ventas',
      description: 'Ver y administrar ventas realizadas',
      iconClass: 'bi-cart-check-fill',
      route: '/admin/ventas',
    },
    {
      title: 'Pedidos',
      description: 'Gestionar pedidos y envíos',
      iconClass: 'bi-truck',
      route: '/admin/pedidos',
    },
  ];

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-5">
        <h1 className="text-center mb-5 display-5 fw-normal text-success">
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard de EcoMarket
        </h1>

        <div className="row justify-content-center">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
