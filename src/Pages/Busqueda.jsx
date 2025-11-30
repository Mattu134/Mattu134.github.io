import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const CATEGORY_ROUTE_MAP = {
  Frutas: "/frutas",
  Verduras: "/frutas", 
  Dulces: "/dulces",
  Lácteos: "/lacteos",
  Lacteos: "/lacteos",
  Carnes: "/carnes",
  Bebidas: "/bebestibles",
  Bebestibles: "/bebestibles",
  Congelados: "/congelados",
  Pescados: "/pescados",
  Panadería: "/panaderia",
  Panaderia: "/panaderia",
  Aseo: "/aseo",
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Busqueda = () => {
  const query = useQuery();
  const searchTerm = (query.get("q") || "").trim();
  const { products = [], loading, error } = useProducts();

  const lowerTerm = searchTerm.toLowerCase();

  const filtered = useMemo(() => {
    if (!lowerTerm) return [];
    return products.filter((p) => {
      const nombre = (p.nombre || p.name || "").toLowerCase();
      const desc = (p.descripcion || "").toLowerCase();
      const cat = (p.categoria || "").toLowerCase();
      return (
        nombre.includes(lowerTerm) ||
        desc.includes(lowerTerm) ||
        cat.includes(lowerTerm)
      );
    });
  }, [products, lowerTerm]);

  const getImageSrc = (p) => {
    const image = p.imagenUrl || p.image;
    if (!image) return "/images/placeholder.png";
    const isExternal = image.startsWith("http");
    return isExternal ? image : `/images/${image}`;
  };

  return (
    <div className="container py-4 py-md-5">
      <h1 className="h3 fw-bold mb-1">Resultados de búsqueda</h1>
      <p className="text-muted mb-4">
        {searchTerm
          ? `Mostrando resultados para: "${searchTerm}"`
          : "Escribe algo en el buscador para encontrar productos."}
      </p>

      {loading && <p className="text-muted">Cargando productos...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && searchTerm && filtered.length === 0 && (
        <p className="text-muted">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
      )}

      <div className="row g-3 g-md-4">
        {filtered.map((p) => {
          const routeCategory = CATEGORY_ROUTE_MAP[p.categoria];
          return (
            <div key={p.id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={getImageSrc(p)}
                  className="card-img-top"
                  alt={p.nombre || p.name}
                  style={{
                    height: "160px",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-semibold mb-1">
                    {p.nombre || p.name}
                  </h6>
                  <small className="text-muted mb-2">
                    {p.categoria || "Sin categoría"}
                  </small>
                  <p className="fw-bold text-success mb-3">
                    ${Number(p.precio || p.price || 0).toLocaleString("es-CL")}
                  </p>
                  {routeCategory && (
                    <Link
                      to={routeCategory}
                      className="btn btn-sm btn-outline-success mt-auto"
                    >
                      Ver más en {p.categoria}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Busqueda;
