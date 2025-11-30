import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const navigate = useNavigate();
  const { products = [] } = useProducts();

  const normalizedTerm = term.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (!normalizedTerm) return [];
    const filtered = products.filter((p) => {
      const nombre = (p.nombre || p.name || "").toLowerCase();
      const desc = (p.descripcion || "").toLowerCase();
      const cat = (p.categoria || "").toLowerCase();
      return (
        nombre.includes(normalizedTerm) ||
        desc.includes(normalizedTerm) ||
        cat.includes(normalizedTerm)
      );
    });
    return filtered.slice(0, 8); // máximo 8 sugerencias
  }, [products, normalizedTerm]);

  const showSuggestions =
    isFocused && normalizedTerm.length > 0 && suggestions.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
    setIsFocused(false);
  };

  const handleSelectProduct = (product) => {
    const routeCategory = CATEGORY_ROUTE_MAP[product.categoria];
    if (routeCategory) {
      navigate(routeCategory);
    } else {
      const q = product.nombre || product.name || "";
      navigate(`/buscar?q=${encodeURIComponent(q)}`);
    }
    setIsFocused(false);
    setTerm("");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="position-relative"
      style={{ maxWidth: "260px", width: "100%" }}
    >
      <form
        className="d-flex align-items-center"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className="form-control form-control-sm me-2"
          type="search"
          placeholder="Buscar productos..."
          aria-label="Buscar"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <button className="btn btn-sm btn-success" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>

      {showSuggestions && (
        <div
          className="position-absolute top-100 start-0 w-100 bg-white border rounded shadow-sm mt-1"
          style={{ zIndex: 1050, maxHeight: "320px", overflowY: "auto" }}
        >
          {suggestions.map((p) => (
            <button
              key={p.id}
              type="button"
              className="btn w-100 text-start border-0 px-3 py-2 suggestion-item"
              onClick={() => handleSelectProduct(p)}
              style={{ fontSize: "0.85rem" }}
            >
              <div className="fw-semibold">
                {p.nombre || p.name}
              </div>
              <div className="text-muted d-flex justify-content-between">
                <small>{p.categoria || "Sin categoría"}</small>
                <small>
                  $
                  {Number(p.precio || p.price || 0).toLocaleString("es-CL")}
                </small>
              </div>
            </button>
          ))}
          <button
            type="button"
            className="btn w-100 text-start border-0 px-3 py-2 bg-light"
            style={{ fontSize: "0.8rem" }}
            onClick={() => {
              const q = term.trim();
              if (!q) return;
              navigate(`/buscar?q=${encodeURIComponent(q)}`);
              setIsFocused(false);
            }}
          >
            Ver todos los resultados para{" "}
            <span className="fw-semibold">"{term.trim()}"</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
