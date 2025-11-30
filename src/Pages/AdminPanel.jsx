import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useAuth } from "../context/AuthContext";

const DashboardCard = ({ title, description, icon, route }) => {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div
        className="card h-100 p-4 shadow-sm border-0"
        style={{
          cursor: "pointer",
          borderRadius: "1rem",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onClick={() => navigate(route)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 0.75rem 1.5rem rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 0.5rem 1rem rgba(0,0,0,0.06)";
        }}
      >
        <div className="card-body text-center">
          <div
            className="mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto",
              borderRadius: "50%",
              backgroundColor: "rgba(25,135,84,0.08)",
              fontSize: "2.3rem",
            }}
          >
            {icon}
          </div>
          <h5 className="card-title fw-bold mt-3 mb-2">{title}</h5>
          <p
            className="card-text text-muted mb-0"
            style={{ fontSize: "0.9rem" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

function AdminPanel() {
  const { user, role } = useAuth();
  const cardsConfig = [
    {
      key: "usuarios",
      title: "Usuarios",
      description: "Gestionar usuarios del sistema",
      icon: "👥",
      route: "/admin/usuarios",
      roles: ["Administrador"], 
    },
    {
      key: "productos",
      title: "Productos",
      description: "Administrar catálogo de productos y stock",
      icon: "🛍️",
      route: "/admin/productos",
      roles: ["Administrador", "Vendedor"], 
    },
    {
      key: "ventas",
      title: "Ventas",
      description: "Ver y administrar ventas realizadas",
      icon: "🛒",
      route: "/admin/ventas",
      roles: ["Administrador"], 
    },
    {
      key: "pedidos",
      title: "Pedidos",
      description: "Gestionar pedidos y envíos",
      icon: "📦",
      route: "/admin/pedidos",
      roles: ["Administrador", "Vendedor"],
    },
  ];

  const visibleCards = cardsConfig.filter(
    (card) => !card.roles || card.roles.includes(role)
  );

  const displayName =
    user?.name || user?.username || "Usuario";

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-5">
        <div className="text-center mb-5">
          <p
            className="text-uppercase text-success fw-semibold mb-1"
            style={{ letterSpacing: "0.12em" }}
          >
            Panel de administración
          </p>
          <h1 className="display-5 fw-semibold mb-2">
            Dashboard de EcoMarket
          </h1>
          <p className="text-muted mb-1">
            Controla usuarios, productos, ventas y pedidos desde un solo lugar.
          </p>
          <p className="text-muted">
            <span className="fw-semibold text-dark">
              Bienvenido, {displayName}
            </span>{" "}
            <span className="badge bg-success-subtle text-success ms-2">
              Rol: {role}
            </span>
          </p>
        </div>

        <div className="row justify-content-center">
          {visibleCards.map((card) => (
            <DashboardCard
              key={card.key}
              title={card.title}
              description={card.description}
              icon={card.icon}
              route={card.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
